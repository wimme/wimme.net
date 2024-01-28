import { Category } from "./category";

export interface News {
    id: number,
    title: string,
    date: number,
    url: string,
    content: string,
    content_type: NewsContentType,
    content_preview: string,
    image: string,
    categories: Category[]
}

export enum NewsContentType {
    Markdown = 'md',
    Redirect = 'redirect',
    HTMLEditor = 'html',
    HTMLRaw = ''
}
