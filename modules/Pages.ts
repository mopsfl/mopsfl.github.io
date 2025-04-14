import Projects from "./Pages/Projects"
import { App } from "./Types/App"
import { Page } from "./Types/Page"

export class Pages {
    private pageButtons: JQuery<HTMLElement>
    private mainContainer: JQuery<HTMLElement>
    private pageContainer: JQuery<HTMLElement>
    private pageMainContent: JQuery<HTMLElement>

    public readonly pages = {
        projects: Projects
    }

    init() {
        this.mainContainer = $(".container")
        this.pageContainer = $(".page-container")
        this.pageButtons = $(".page-buttons")
        this.pageMainContent = $(".page-content>.page-main")
        this.pageContainer.hide()

        this.pageButtons.find(".btn").each((index, element) => {
            const button = $(element)

            button.on("click", () => {
                this.LoadPage(button.attr("pageid"))
            })
        })

        $(document.body).on("scroll", () => {
            if ($(document.body).scrollTop() > 0) {
                $(".page-scroll-arrow").fadeOut();
            } else {
                $(".page-scroll-arrow").fadeIn();
            }
        })

        $(".page-scroll-arrow").on("click", () => {
            $(document.body).animate({ scrollTop: $(".page-main").offset().top / 2 }, 1000)
        })

        return this
    }

    LoadPage(pageid: string) {
        if (!pageid) return console.error("unable to load page. missing <pageid: string>")
        const page: Page = this.pages[pageid]
        if (!page) return console.error(`unable to load page '${pageid}'. unknown <pageid: string>`)

        var pageLoadFinished = false

        this.mainContainer.fadeOut()
        this.pageMainContent.empty()

        page.baseElements.forEach(html => {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            this.pageMainContent.append((template.content.firstChild as any));
        });

        App.elements.GetElement(".loading-message").fadeIn()

        const loadTimeout = setTimeout(() => {
            if (!pageLoadFinished) App.elements.GetElement(".loading-long-message").fadeIn()
        }, 2000);

        page.load(this.pageMainContent).then(() => {
            setTimeout(() => this.pageContainer.fadeIn(), 1000)

            pageLoadFinished = true
            clearTimeout(loadTimeout)

            App.elements.GetElement(".loading-message").fadeOut()
            App.elements.GetElement(".loading-long-message").fadeOut()

            this.pageContainer.find(".page-title").text(page.title)
            this.pageContainer.find(".page-desc").text(page.description)
        });
    }
}