import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    private _siteName?: string;
    private _siteDescription?: string;

    constructor(
        private _titleService: Title,
        private _metaService: Meta,
        @Inject(DOCUMENT) private _document: Document) {
    }

    private _setMetaTag(attr: 'name' | 'property' | 'itemprop', attrValue: string, content?: string | undefined, selector?: string) {
        if (content) {
            this._metaService.updateTag({ [attr]: attrValue, content }, selector);
        } else {
            this._metaService.removeTag(`${attr}='${attrValue}'`);
        }
    }

    public clear(): void {
        this._removeStructuredData();
        this.update();
    }

    public setSiteDescription(description?: string): void {
        this._siteDescription = description;
        this._setMetaTag('name', 'description', description);
    }

    public setKeywords(keywords?: string | string[]) {
        const wordsAsString = keywords instanceof Array ? keywords?.join(',') : keywords;
        this._setMetaTag('name', 'keywords', wordsAsString);
    }

    public setSiteName(siteName?: string) {
        this._siteName = siteName;
        this._setMetaTag('name', 'og:site_name', siteName);
    }

    public setLanguage(language: string) {
        this._document.documentElement.lang = language;
        this._setMetaTag('property', 'og:locale', language);
    }

    public update(title?: string, type?: 'article' | 'website', description?: string, image?: string) {
        this._setTitle(title);
        this._setType(type);
        this._setDescription(description);
        this._setImage(image);
        this._insertSchema(this._generateSchema([
            this._websiteSchema(this._siteName, this._siteDescription),
            this._webpageSchema(title, description, image)
        ]));
    }

    private _setType(type?: 'article' | 'website'): void {
        this._setMetaTag('property', 'og:type', type);
    }

    private _setDescription(description?: string): void {
        this._setMetaTag('name', 'twitter:description', description);
        this._setMetaTag('property', 'og:description', description);
        this._setMetaTag('itemprop', 'description', description, `itemprop='description'`);
    }

    private _setAuthor(author?: string) {
        this._setMetaTag('name', 'author', author);
        this._setMetaTag('name', 'article:author', author);
    }

    private _setImage(image?: string): void {
        this._setMetaTag('property', 'og:image', image);
    }

    private _setTitle(title?: string): void {
        if (title) {
            this._titleService.setTitle(`${title} - ${this._siteName}`);
        }
        else {
            this._titleService.setTitle(this._siteName || '');
        }
        this._setMetaTag('name', 'title', title);
        this._setMetaTag('name', 'twitter:title', title);
        this._setMetaTag('name', 'twitter:image:alt', title);
        this._setMetaTag('property', 'og:title', title);
        this._setMetaTag('property', 'og:image:alt', title);
        this._setMetaTag('itemprop', 'name', title, `itemprop='name'`);
    }

    private _removeStructuredData(): void {
		const els: HTMLScriptElement[] = [];
		[ 'structured-data', 'structured-data-org' ].forEach(c => {
			els.push(...Array.from(this._document.head.getElementsByClassName(c) as HTMLCollectionOf<HTMLScriptElement>));
		});
		els.forEach(el => this._document.head.removeChild(el));
	}

	private _insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
		let script: HTMLScriptElement;
		let shouldAppend = false;
		if (this._document.head.getElementsByClassName(className).length) {
			script = this._document.head.getElementsByClassName(className)[0] as HTMLScriptElement;
		} else {
			script = this._document.createElement('script');
			shouldAppend = true;
		}
		script.setAttribute('class', className);
		script.type = 'application/json+ld';
		script.text = JSON.stringify(schema);
		if (shouldAppend) {
			this._document.head.appendChild(script);
		}
	}

    private _generateSchema(schemas: Record<string, any>[]): Record<string, any> {
        return {
            '@context': 'http://schema.org',
            '@graph': schemas
        };
    }

    private _websiteSchema(name?: string, description?: string): Record<string, any> {
		return {
			'@type': 'WebSite',
            '@id': `${window.location.origin}/#website`,
			url: window.location.origin,
			name: name,
            description: description
		};
	}

    private _webpageSchema(title?: string, description?: string, image?: string): Record<string, any> {
        return {
			'@type': 'WebPage',
			url: window.location.href,
			name: title || this._siteName,
            isPartOf: {
                '@id': `${window.location.origin}/#website`
            },
            description: description,
            thumbnailUrl: image
        };
    }
}
