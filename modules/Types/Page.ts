export type Page = {
    title: string,
    description: string,
    baseElements: string[],

    load: (pageContent: JQuery<HTMLElement>) => Promise<void>
}