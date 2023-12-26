import https from 'https';
import fs from 'fs';
import { spawn } from 'node:child_process';

function sendRequest(apiUrl, module, action, params) {
    return new Promise((resolve, reject) => {
        var req = https.request(apiUrl,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            },
            res => {
                let rawData = '';
                res.on('data', chunk => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        reject(e.message);
                    }
                });
            }
        );

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify({ module, action, params }));

        req.end();
    });
}

function writeToFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

async function getNav(apiUrl) {
    return await sendRequest(apiUrl, 'core', 'getnav', { includeSubNav: true });
}

function getUrlsFromNav(nav) {
    const urls = [];
    const baseUrl = '/';
    nav.forEach(one => {
        urls.push(baseUrl + one.url);
        one.sub?.forEach(sub => {
            urls.push(baseUrl + sub.url);
        });
    });
    return urls;
}

async function run() {
    const hostname = process.argv.slice(2)[0];
    const apiUrl = `https://cms.${hostname}/system/json/`;
    const nav = await getNav(apiUrl);
    const urls = getUrlsFromNav(nav);
    writeToFile('routes.txt', urls.join('\n'));
    process.env['HOSTNAME'] = hostname; // used in app.server.module.ts

    const child = spawn('npx', [
        'ng',
        'run',
        `wimme.net:prerender${hostname !== 'wimme.net' ? `:production-${hostname}`: ''}`
    ], { shell: process.platform === 'win32' });
    child.stdout.pipe(process.stdout);
}

await run();
