import $ from "jquery";

export class Elements {
    init() {
        return this
    }

    CloneTemplate(name: string) {
        return $($(`.template-${name}`).contents().clone())
    }
}