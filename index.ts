import { Api } from "./modules/Api";
import { Background } from "./modules/Background";
import { Elements } from "./modules/Elements";
import { Pages } from "./modules/Pages";
import { App } from "./modules/Types/App";
import $ from "jquery";

$(async function () {
    App.isDev = location.hostname === "localhost";
    App.api = new Api().init()
    App.elements = new Elements().init()
    App.background = await new Background().init()
    App.pages = new Pages().init()
    App.isDev && ((window as any).App = App)
})

export { App };