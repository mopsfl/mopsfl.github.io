import { App } from "../Types/App"
import { Project } from "../Types/Projects"
import $ from "jquery";

export default {
    title: "About",
    description: "Here you'll find some information about me, my skills, and what I like to do.",
    baseElements: [
        `<h2>im flo</h2>`,
        `<span>more soon... :)</span>`
    ],

    async load(page: JQuery<HTMLElement>) {
        return new Promise(async (resolve, reject) => {

            resolve(undefined)
        })
    },
}