export class NavAction {
    constructor(name, text, action, icon, color = '#333333', show = true) {
        this.name = name;
        this.labelText = text;
        this.color = color;
        this.icon = icon;
        this.clickAction = action;
        this.show = show
    }
}
