<?php

$host = '';

if(str_ends_with($_SERVER['SERVER_NAME'], 'wimme.net')) {
    $host = 'wimme.net';
}
else if(str_ends_with($_SERVER['SERVER_NAME'], 'skipdewinterdip.be')) {
    $host = 'skipdewinterdip.be';
}
else {
    header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request');
    exit;
}

function pageExists($nav, $requestUrl) {
    foreach($nav as $entry) {
        if($entry['url'] === $requestUrl) {
            return true;
        }
        if(isset($entry['sub'])) {
            if(pageExists($entry['sub'], $requestUrl)) {
                return true;
            }
        }
    }

    return false;
}

$payload = array(
    'module' => 'core',
    'action' => 'getnav',
    'params' => array('includeSubNav' => true)
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://cms.' . $host . '/system/json/');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$data = curl_exec($ch);

if(!curl_errno($ch)) {
    $info = curl_getinfo($ch);
    if(strpos($info['content_type'], 'application/json') !== FALSE) {
        $nav = json_decode($data, true);
        if(pageExists($nav, substr($_SERVER['REQUEST_URI'], 1))) {
            $page = @file_get_contents(__DIR__ . '/../index.html');
            if($page !== false) {
                header('Content-Type: text/html');
                echo $page;
            }
            else {
                header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
            }
        }
        else {
            header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
        }
    }
    else {
        header($_SERVER['SERVER_PROTOCOL'].' 500 Internal Server Error');
    }
}
else {
    header($_SERVER['SERVER_PROTOCOL'].' 500 Internal Server Error');
}

curl_close($ch);

?>
