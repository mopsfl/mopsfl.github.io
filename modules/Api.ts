import { App } from "./Types/App"

export class Api {
    private API_URL: string

    public Endpoints = {
        GET_PROJECTS: "projects"
    }

    init() {
        this.API_URL = App.isDev ? "http://localhost:6969/v1/" : "https://api.mopsfl.de/v1/"
        return this
    }

    async Get(endpoint: string) {
        if (!endpoint) throw new Error("missing argument <endpoint: string>")
        return await fetch(this.API_URL + endpoint).then(res => res.json()).catch(console.error)
    }
}