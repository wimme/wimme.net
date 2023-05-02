export interface Settings {
    name: string,
    language: string,
    description: string,
    keywords: string,
    logo: string,
    footer: string,
    socials: Social[]
}

export interface Social {
    name: string,
    url: string
}
