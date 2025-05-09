import { App } from "../Types/App"
import { Project } from "../Types/Projects"
import $ from "jquery";

export default {
    title: "Projects",
    description: "A collection of all my projects, highlighting what I've built and worked on.",
    baseElements: [
        `<div class="project-list"></div>`
    ],

    async load(page: JQuery<HTMLElement>) {
        return new Promise(async (resolve, reject) => {
            const projectList = $(page.find(".project-list")),
                projectsJson: Project[] = await App.api.Get(App.api.Endpoints.GET_PROJECTS)

            projectsJson.forEach(project => {
                const projectItem = App.elements.CloneTemplate("project-item"),
                    projectButtons = $(projectItem.find(".project-buttons"))

                projectItem.find(".project-title").text(project.title)
                projectItem.find(".project-desc").text(project.description.de)
                projectItem.find(".project-icon").attr("src", `./images/projects/${project.icon}`)

                if (project.urls) {
                    project.urls.forEach(url => {
                        const linkBtn = projectItem.find(".link-btn-template").clone(),
                            hoverText = $(linkBtn.find(".hover-text"))

                        hoverText.text(url.name)
                        linkBtn.attr("href", url.url)
                            .addClass(`fa-${url.icon}`)
                            .removeClass("hide link-btn-template")
                            .appendTo(projectButtons)
                    })
                }

                projectItem.appendTo(projectList)
            })
            resolve(undefined)
        })
    },
}