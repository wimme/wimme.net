import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as Showdown from 'showdown';
import { ApiService } from '../../../services/api.service';
import { News } from '../interfaces/news';

@Injectable()
export class NewsService {

    private readonly _markdownConverter: Showdown.Converter;

    constructor(
        private _sanitizer: DomSanitizer,
        private _apiService: ApiService
    ) {
        this._markdownConverter = new Showdown.Converter();
    }

    public getImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        let imageWidth = '';
        if (responsiveMaxWidth && percentage && window.innerWidth > responsiveMaxWidth) {
            imageWidth = '&w=' + Math.ceil(window.innerWidth * percentage * 0.01 * window.devicePixelRatio);
        }
        return url.replace('sites/cms.wimme.net/files/', 'https://img.wimme.net/') + '?vw=' + window.innerWidth + '&dpr=' + window.devicePixelRatio + imageWidth;
    }

    public getHtml(content: string, contentType: string): SafeHtml {
        let html = content;
        if (contentType === 'md') {
            this._markdownConverter.setFlavor('github');
            this._markdownConverter.setOption('noHeaderId', true);
            this._markdownConverter.setOption('smoothLivePreview', true);
            this._markdownConverter.setOption('strikethrough', true);
            this._markdownConverter.setOption('tables', true);
            this._markdownConverter.setOption('tablesHeaderId', false);
            html = this._markdownConverter.makeHtml(content);
        }
        if (html) {
            html = html.replace(/(href|src)=("|')\/?sites\/cms\.wimme\.net\/files\/(\S+)("|')/gm, '$1=$2https://img.wimme.net/$3?vw=' + window.innerWidth + '&amp;dpr=' + window.devicePixelRatio + '$4');
		}
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    public getSlug(title: string): string {
        return title.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    public getPinned(id: number, category?: number): Observable<News[]> {
        return this._apiService.get<News[]>('news', 'getpinned', { id, category });
    }

    public getNews(id: number, category?: number): Observable<News[]> {
        return this._apiService.get<News[]>('news', 'getnews', { id, category });
    }

    public getNewsItem(id: number, newsId: number): Observable<News> {
        return this._apiService.get<News>('news', 'getnewsitem', { id, newsid: newsId });
    }

    public getNext(id: number, newsId: number): Observable<{ next?: News, previous?: News }> {
        return this._apiService.get<{ next?: News, previous?: News }>('news', 'getnext', { id, newsid: newsId });
    }

}
