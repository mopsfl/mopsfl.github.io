import { App } from "../Types/App"
import { Project } from "../Types/Projects"
import $ from "jquery";

export default {
    title: "Contact",
    description: "Here are a few ways to contact me.",
    baseElements: [
        `<span>soon... :)</span>`
    ],

    async load(page: JQuery<HTMLElement>) {
        return new Promise(async (resolve, reject) => {

            resolve(undefined)
        })
    },
}