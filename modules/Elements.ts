export class Elements {
    init() {
        return this
    }

    CloneTemplate(name: string) {
        return $($(`.template-${name}`).contents().clone())
    }

    GetElement(className: string) {
        return $(className)
    }
}