import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects"
import { App } from "./Types/App"
import { Page } from "./Types/Page"
import $ from "jquery";

export class Pages {
    private pageButtons: JQuery<HTMLElement>
    private mainContainer: JQuery<HTMLElement>
    private pageContainer: JQuery<HTMLElement>
    private pageMainContent: JQuery<HTMLElement>

    private isPageOpen = false
    private _pageShowTimeout: NodeJS.Timeout

    public readonly pages = {
        projects: Projects,
        about: About,
        contact: Contact,
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

        $(".back-btn").on("click", () => {
            if (!this.isPageOpen) return
            this._pageShowTimeout && clearTimeout(this._pageShowTimeout)
            this._pageShowTimeout = undefined
            this.isPageOpen = false

            $(".back-btn").fadeOut()
            this.pageContainer.fadeOut()
            setTimeout(() => this.mainContainer.fadeIn(), 1000)
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
        if (this.isPageOpen) return console.error(`unable to load page '${pageid}'. another page is already opened!`)
        this.isPageOpen = true

        var pageLoadFinished = false

        this.mainContainer.fadeOut()
        this.pageMainContent.empty()

        page.baseElements.forEach(html => {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            this.pageMainContent.append((template.content.firstChild as any));
        });

        $(".loading-message").fadeIn()
        $(".back-btn").fadeIn()

        const loadTimeout = setTimeout(() => {
            if (!pageLoadFinished) $(".loading-long-message").fadeIn()
        }, 2000);

        page.load(this.pageMainContent).then(() => {
            this._pageShowTimeout = setTimeout(() => this.pageContainer.fadeIn(), 1000)

            pageLoadFinished = true
            clearTimeout(loadTimeout)

            $(".loading-message").fadeOut()
            $(".loading-long-message").fadeOut()

            this.pageContainer.find(".page-title").text(page.title)
            this.pageContainer.find(".page-desc").text(page.description)
        });
    }
}