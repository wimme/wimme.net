import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SeoJsonLdService } from './seo-json-ld.service';
import { SeoItem } from '../interfaces/seoitem';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    private _siteName?: string;
    private _siteDescription?: string;
    private _siteKeywords?: string;

    constructor(
        private _titleService: Title,
        private _metaService: Meta,
        private _jsonLdService : SeoJsonLdService,
        @Inject(DOCUMENT) private _document: Document) {
    }

    public clear(): void {
        this._jsonLdService.removeStructuredData();
        this.update();
    }

    public setSiteDescription(description?: string): void {
        this._siteDescription = description;
        if (description) {
            this._metaService.updateTag({ name: 'description', content: description });
        } else {
            this._metaService.removeTag(`name='description'`);
        }
    }

    public setSiteKeywords(keywords?: string | string[]): void {
        const wordsAsString = keywords instanceof Array ? keywords?.join(',') : keywords;
        this._siteKeywords = wordsAsString;
        if (wordsAsString) {
            this._metaService.updateTag({ name: 'keywords', content: wordsAsString });
        } else {
            this._metaService.removeTag(`name='keywords'`);
        }
    }

    public setSiteName(siteName?: string) {
        this._siteName = siteName;
        if (siteName) {
            this._metaService.updateTag({ name: 'og:site_name', content: siteName });
        } else {
            this._metaService.removeTag(`name='og:site_name'`);
        }
    }

    public setLanguage(language: string) {
        this._document.documentElement.lang = language;
        if (language) {
            this._metaService.updateTag({ property: 'og:locale', content: language });
        } else {
            this._metaService.removeTag(`property='og:locale'`);
        }
    }

    public update(data?: SeoItem): void {
        this._setSection(data?.section);
        this._setTitle(data?.title);
        this._setType(data?.type);
        this._setDescription(data?.description);
        this._setKeywords(data?.keywords);
        this._setImage(data?.image);
        this._setUrl(data?.url);
        this._setPublished(data?.utcPublished);
        this._setModified(data?.utcModified);
        this._setAuthor(data?.author);
        this._jsonLdService.update(this._siteName, this._siteDescription, data);
    }

    private _setSection(section?: string): void {
        if (section) {
            this._metaService.updateTag({ name: 'article:section', content: section });
        } else {
            this._metaService.removeTag(`name='article:section'`);
        }
    }

    private _setTitle(title: string = ''): void {
        if (title && title.length) {
            this._titleService.setTitle(`${title} - ${this._siteName}`);
            this._metaService.updateTag({ property: 'og:image:alt', content: title });
            this._metaService.updateTag({ property: 'og:title', content: title });
            this._metaService.updateTag({ name: 'title', content: title });
            this._metaService.updateTag({ itemprop: 'name', content: title }, `itemprop='name'`);
        } else {
            this._titleService.setTitle(this._siteName || '');
            this._metaService.removeTag(`property='og:image:alt'`);
            this._metaService.removeTag(`property='og:title'`);
            this._metaService.removeTag(`name='title'`);
            this._metaService.removeTag(`itemprop='name'`);
        }
    }

    public _setType(type?: 'article' | 'website'): void {
        if (type && type.length) {
            this._metaService.updateTag({ property: 'og:type', content: type });
        } else {
            this._metaService.removeTag(`property='og:type'`);
        }
    }

    private _setDescription(description?: string): void {
        if (description && description.length) {
            this._metaService.updateTag({ property: 'og:description', content: description });
            this._metaService.updateTag({ itemprop: 'description', content: description }, `itemprop='description'`);
        } else {
            this._metaService.removeTag(`property='og:description'`);
            this._metaService.removeTag(`itemprop='description'`);
        }
    }

    private _setKeywords(keywords?: string | string[]): void {
        const wordsAsString = (keywords instanceof Array ? keywords?.join(',') : keywords) || this._siteKeywords;
        if (wordsAsString) {
            this._metaService.updateTag({ name: 'keywords', content: wordsAsString });
        } else {
            this._metaService.removeTag(`name='keywords'`);
        }
    }

    private _setImage(image?: string): void {
        if (image && image.length) {
            this._metaService.updateTag({ itemprop: 'image', content: image }, `itemprop='image'`);
            this._metaService.updateTag({ property: 'og:image', content: image });
        } else {
            this._metaService.removeTag(`property='og:image'`);
            this._metaService.removeTag(`itemprop='image'`);
        }
    }

    private _setUrl(url?: string): void {
        if (url && url.length) {
            this._metaService.updateTag({ property: 'og:url', content: url });
        } else {
            this._metaService.removeTag(`property='og:url'`);
        }
        this._setCanonicalUrl(url);
    }

    private _setPublished(utcPublished?: number): void {
        if (utcPublished) {
            const publishedDate = new Date(utcPublished * 1000);
            this._metaService.updateTag({ name: 'article:published_time', content: publishedDate.toISOString() });
            this._metaService.updateTag({ name: 'publication_date', content: publishedDate.toISOString() });
        } else {
            this._metaService.removeTag(`name='article:published_time'`);
            this._metaService.removeTag(`name='publication_date'`);
        }
    }

    private _setModified(utcModified?: number): void {
        if (utcModified) {
            const modifiedDate = new Date(utcModified * 1000);
            this._metaService.updateTag({ name: 'article:modified_time', content: modifiedDate.toISOString() });
            this._metaService.updateTag({ name: 'og:updated_time', content: modifiedDate.toISOString() });
        } else {
            this._metaService.removeTag(`name='article:modified_time'`);
            this._metaService.removeTag(`name='og:updated_time'`);
        }
    }

    private _setAuthor(author?: string): void {
        if (author && author.length) {
            this._metaService.updateTag({ name: 'article:author', content: author });
            this._metaService.updateTag({ name: 'author', content: author });
        } else {
            this._metaService.removeTag(`name='article:author'`);
            this._metaService.removeTag(`name='author'`);
        }
    }

    private _setCanonicalUrl(url?: string): void {
        // first remove potential previous url
        const selector = `link[rel='canonical']`;
        const canonicalElement = this._document.head.querySelector(selector);
        if (canonicalElement) {
            this._document.head.removeChild(canonicalElement);
        }

        if (url && url.length) {
            const link: HTMLLinkElement = this._document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', url);
            this._document.head.appendChild(link);
        }
    }
}
