

import Util from "./Util";
import {fromEvent, Observable} from "rxjs/index";

export default class DomStyle {
    constructor(el) {
        if (el instanceof Element)
            this.el = el
        else if (el instanceof HTMLElement)
            this.el = el
        else
            this.el = document.querySelector(el)
    }

    static select(el) {
        return new DomStyle(el)
    }

    static selectAll(el) {
        return document.querySelectorAll(el).map(val => DomStyle.select(val))
    }

    static styleString(style) {
        return Object.entries(style).reduce((styleString, [propName, propValue]) => {
            propName = propName.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`);

            return `${styleString}${propName}:${propValue};`;
        }, '')
    }

    setStyle(style = {}) {
        if (this.el && style) {
            Object.keys(style).forEach(name => {
                this.el.style[Util.camelCaseToDash(name)] = style[name]
            })
        }

        return this
    }

    addClass(...className) {
        if (this.el && className)
            this.el.classList.add(...className)

        return this
    }

    removeClass(...className) {
        if (this.el && className)
            this.el.classList.remove(...className)

        return this
    }

    replaceClass(from, to) {
        if (this.el)
            this.el.classList.replace(from, to)

        return this
    }

    innerHTML(html) {
        if (this.el)
            this.el.innerHTML = html

        return this
    }

    on(eventName) {
        if (this.el)
            return fromEvent(this.el, eventName)

        return new Observable(subscriber => {
            subscriber.error()
            subscriber.complete()
        })
    }

    find(str) {
        if (this.el)
            return new DomStyle(this.el.querySelector(str))

        return DomStyle.select(null)
    }

    findAll(str) {
        const node_list = []
        if (this.el)
            this.el.querySelectorAll(str).forEach((node) => {
                node_list.push(new DomStyle(node))
            })

        return node_list
    }

    static selectAllEl(str, parent) {
        if (parent)
            return parent.querySelectorAll(str)

        return document.querySelectorAll(str)
    }

    static createStyle(select, style) {
        const headElts = document.getElementsByTagName("head");
        const styleSheetElement = document.createElement("style");
        styleSheetElement.type = "text/css";
        const styleStr = DomStyle.styleString(style)

        if (styleSheetElement.styleSheet) {
            // This is required for IE8 and below.
            styleSheetElement.styleSheet.addRule(select, styleStr)
        } else {
            styleSheetElement.appendChild(document.createTextNode(`${select}{${styleStr}}`));
        }

        headElts[0].appendChild(styleSheetElement);
    }

    /**
     * const obj = {
      select: {
        rule1: 'value1',
        rule2: 'value2'
      }
    }
     * @param data
     * @param root
     */
    createMultiStyle(data, root = '') {
        const doc = document;
        const allSS = doc.styleSheets;
        if (!allSS) return;

        const headElts = doc.getElementsByTagName("head");
        if (!headElts.length) return;

        let styleSheet, media, iSS = allSS.length; // scope is global in a function
        /* 1. search for media == "screen" */
        while (iSS) {
            --iSS;
            if (allSS[iSS].disabled) continue; /* dont take into account the disabled stylesheets */
            media = allSS[iSS].media;
            if (typeof media == "object")
                media = media.mediaText;
            if (media === "" || media === 'all' || media.indexOf("screen") !== -1) {
                styleSheet = allSS[iSS];
                iSS = -1;   // indication that media=="screen" was found (if not, then iSS==0)
                break;
            }
        }

        /* 2. if not found, create one */
        if (iSS !== -1) {
            const styleSheetElement = doc.createElement("style");
            styleSheetElement.type = "text/css";
            headElts[0].appendChild(styleSheetElement);
            styleSheet = doc.styleSheets[allSS.length]; /* take the new stylesheet to add the selector and the style */
        }

        /* 3. add the selector and style */
        Object.keys(data).map(select => {
            const styleStr = DomStyle.styleString(data[select])
            const tSelect = root + ' ' + select

            switch (typeof styleSheet.media) {
                case "string":
                    styleSheet.addRule(tSelect, styleStr);
                    break;
                case "object":
                    styleSheet.insertRule(`${tSelect}{${styleStr}}`, styleSheet.cssRules.length);
                    break;
            }
        })
    }

    offset() {
        const el = this.el
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}
