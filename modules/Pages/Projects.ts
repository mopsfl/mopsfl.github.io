import { App } from "../Types/App"
import { Project } from "../Types/Projects"
import $ from "jquery";

export default {
    title: "Projects",
    description: "A collection of all my projects, highlighting what I've built and worked on.",
    baseElements: [
        `<div class="project-list"></div>`
    ],

    async load(pageContent: JQuery<HTMLElement>) {
        return new Promise(async (resolve, reject) => {
            const projectList = $(pageContent.find(".project-list")),
                projectsJson: Project[] = await App.api.Get(App.api.Endpoints.GET_PROJECTS)

            projectsJson.forEach(project => {
                const projectItem = App.elements.CloneTemplate("project-item")

                projectItem.find(".project-title").text(project.title)
                projectItem.find(".project-desc").text(project.description.de)
                projectItem.find(".project-icon").attr("src", `./images/projects/${project.icon}`)

                if (project.github) {
                    projectItem.find(".github-link").attr("href", project.github)
                } else projectItem.find(".github-link").hide()

                projectItem.appendTo(projectList)
            })
            resolve(undefined)
        })
    },
}