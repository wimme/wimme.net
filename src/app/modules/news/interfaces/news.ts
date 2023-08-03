import { Category } from "./category";

export interface News {
    id: number,
    title: string,
    date: number,
    url: string,
    content: string,
    content_type: string,
    content_preview: string,
    image: string,
    categories: Category[]
}
