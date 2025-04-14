import { Api } from "../API";
import { Background } from "../Background";
import { Elements } from "../Elements";
import { Pages } from "../Pages";

interface App {
    isDev?: boolean,
    background?: Background,
    pages?: Pages,
    api?: Api,
    elements?: Elements,
}

export const App: App = {};