export interface SeoItem {
    title?: string;
    description?: string;
    keywords?: string | string[];
    image?: string;
    url?: string;
    type?: 'article' | 'website';
    author?: string;
    section?: string;
    utcPublished?: number;
    utcModified?: number;
}
