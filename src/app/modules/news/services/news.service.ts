import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as Showdown from 'showdown';
import { ApiService } from '../../../services/api.service';
import { LocationService } from '../../../services/location.service';
import { WindowRefService } from '../../../services/windowref.service';
import { News } from '../interfaces/news';

@Injectable()
export class NewsService {

    private readonly _markdownConverter: Showdown.Converter;

    constructor(
        private _sanitizer: DomSanitizer,
        private _apiService: ApiService,
        private _locationService: LocationService,
        private _windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) private _platformId: string
    ) {
        this._markdownConverter = new Showdown.Converter();
    }

    public getImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        const host = this._locationService.hostname;
        const imageUrl = url.replace(`sites/cms.${host}/files/`, `https://img.${host}/`);
        if (isPlatformBrowser(this._platformId)) {
            const w = this._windowRefService.nativeWindow;
            let imageWidth = '';
            if (responsiveMaxWidth && percentage && w.innerWidth > responsiveMaxWidth) {
                imageWidth = '&w=' + Math.ceil(w.innerWidth * percentage * 0.01 * w.devicePixelRatio);
            }
            return imageUrl + '?vw=' + w.innerWidth + '&dpr=' + w.devicePixelRatio + imageWidth;
        }
        return imageUrl + (percentage ? `?p=${percentage}` : '');
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
            const host = this._locationService.hostname;
            const hostEscaped = host.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
            const pattern = `(href|src)=("|')\\/?sites\\/cms\\.${hostEscaped}\\/files\\/(\\S+)\\.(jpg|JPG|png|PNG|webp|WEBP)("|')`;
            const regex = new RegExp(pattern, 'gm');
            const w = this._windowRefService.nativeWindow;
            html = html.replace(regex, `$1=$2https://img.${host}/$3.$4?vw=` + w.innerWidth + '&amp;dpr=' + w.devicePixelRatio + '$5');
            html = html.replace(/(href|src)=("|')\/?sites\/(\S+)("|')/, `$1=$2https://cms.${host}/sites/$3$4`);
		}
        return this._sanitizer.bypassSecurityTrustHtml(html);
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
