"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const API_1 = require("./modules/API");
const Background_1 = require("./modules/Background");
const Elements_1 = require("./modules/Elements");
const Pages_1 = require("./modules/Pages");
const App_1 = require("./modules/Types/App");
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return App_1.App; } });
$(async function () {
    App_1.App.isDev = location.hostname === "localhost";
    App_1.App.api = new API_1.Api().init();
    App_1.App.elements = new Elements_1.Elements().init();
    App_1.App.background = await new Background_1.Background().init();
    App_1.App.pages = new Pages_1.Pages().init();
    App_1.App.isDev && (window.App = App_1.App);
});
