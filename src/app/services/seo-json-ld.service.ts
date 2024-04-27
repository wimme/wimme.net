import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocationService } from './location.service';
import { SeoItem } from '../interfaces/seoitem';

interface JsonLd {
    [param: string]: string | string[] | Record<string, string> | JsonLd | JsonLd[] | undefined;
}

@Injectable({
    providedIn: 'root'
})
export class SeoJsonLdService {

    constructor(
        private _locationService: LocationService,
        @Inject(DOCUMENT) private _document: Document) {
    }

    public update(siteName?: string, siteDescription?: string, siteSameAs?: string[], data?: SeoItem): void {
        this._inject(this._generateSchema([
            this._websiteSchema(siteName, siteDescription, siteSameAs),
            data?.type === 'article' ? this._articleSchema(data?.title || siteName, data?.description, data?.image, data?.utcPublished, data?.utcModified, data?.author) : this._webpageSchema(data?.title || siteName, data?.description, data?.image)
        ]));
    }

    public removeStructuredData(): void {
        const ldJsonScriptTag = this._document.head.querySelector<HTMLScriptElement>(`script[type='application/ld+json']`);
        if (ldJsonScriptTag) {
            this._document.head.removeChild(ldJsonScriptTag);
        }
    }

    private _inject(schema: JsonLd): void {
        let ldJsonScriptTag = this._document.head.querySelector<HTMLScriptElement>(`script[type='application/ld+json']`);
        if (!ldJsonScriptTag) {
            ldJsonScriptTag = this._document.createElement('script');
            ldJsonScriptTag.setAttribute('type', 'application/ld+json');
            this._document.head.appendChild(ldJsonScriptTag);
        }
        ldJsonScriptTag.textContent = JSON.stringify(schema);
    }

    private _generateSchema(schemas: JsonLd[]): JsonLd {
        return {
            '@context': 'http://schema.org',
            '@graph': schemas
        };
    }

    private _websiteSchema(name?: string, description?: string, sameAs?: string[]): JsonLd {
        return {
            '@type': 'WebSite',
            '@id': `${this._locationService.origin}/#website`,
            url: this._locationService.origin,
            name: name,
            description: description,
            sameAs: sameAs
        };
    }

    private _webpageSchema(title?: string, description?: string, image?: string): JsonLd {
        return {
            '@type': 'WebPage',
            url: this._locationService.href,
            name: title,
            isPartOf: {
                '@id': `${this._locationService.origin}/#website`
            },
            description: description,
            thumbnailUrl: image
        };
    }

    private _articleSchema(title?: string, description?: string, image?: string, utcPublished?: number, utcModified?: number, author?: string): JsonLd {
        return {
            '@type': 'NewsArticle',
            url: this._locationService.href,
            headline: title,
            image: image,
            datePublished: utcPublished ? (new Date(utcPublished * 1000)).toISOString() : '',
            dateModified: utcModified ? (new Date(utcModified * 1000)).toISOString() : '',
            description: description,
            isPartOf: {
                '@id': `${this._locationService.origin}/#website`
            },
            author: author ? this._authorSchema(author) : undefined
        };
    }

    private _authorSchema(author?: string): JsonLd {
        return {
            '@type': 'Person',
            name: author
        };
    }
}
