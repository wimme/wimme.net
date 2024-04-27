import { Category } from "./category";

export interface News {
    id: number,
    title: string,
    date: number,
    date_lastupdated: number,
    url: string,
    content: string,
    content_type: NewsContentType,
    content_preview: string,
    image: string,
    categories: Category[],
    parent?: number,
    has_children: boolean
}

export enum NewsContentType {
    Markdown = 'md',
    Redirect = 'redirect',
    HTMLEditor = 'html',
    HTMLRaw = ''
}
