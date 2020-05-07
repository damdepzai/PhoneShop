import DomStyle from "../helpers/DomStyle";

const PLACEMENT = ['top', 'left', 'bottom', 'right']

export default {
    bind(el, binding, vnode) {
        const text = binding.value
        const modifiers = binding.modifiers
        let placement = PLACEMENT[0]
        if (typeof modifiers == 'object' && Object.keys(modifiers).length)
            placement = Object.keys(modifiers).filter(name => modifiers[name])[0]
        if (el) {
            const args = {
                p: placement,
                el: el,
                text: text,
                uuid: _.uuid()
            }
            el.addEventListener('mouseover', mouseover.bind(null, args))
            el.addEventListener('mouseout', mouseout.bind(null, args))
        }
    },
    inserted(el, binding, vnode, oldVnode) {

    },
    componentUpdated(el, binding, vnode, oldVnode) {

    },
    unbind(el, binding, vnode, oldVnode) {
        el.removeEventListener('mouseover', mouseover)
        el.removeEventListener('mouseout', mouseout)
    }
}

function createTemplate(args, x, y) {
    const warp = document.createElement('div')
    warp.setAttribute('id', args.uuid)
    warp.setAttribute('x-placement', args.p)
    warp.classList.add('tool-tip-tpl')
    warp.style.position = 'absolute'
    warp.style.top = y + 'px'
    warp.style.left = x + 'px'
    // warp.style.maxWidth = 150 + 'px'
    warp.style.zIndex = '999999'
    const content = document.createElement('span')
    content.classList.add('tool-tip-content')
    content.innerHTML = args.text
    warp.append(content)
    document.body.append(warp)
    warp.classList.add('open')
    const arrow = document.createElement('span')
    arrow.classList.add('tooltip-arrow')
    warp.appendChild(arrow)
    switch (args.p) {
        case 'top':
            warp.style.maxWidth = 500 + 'px'
            warp.style.left = x - warp.clientWidth / 2 + 'px'
            warp.style.top = y - warp.clientHeight - arrow.clientHeight + 'px'
            arrow.style.top = warp.clientHeight + 'px'
            arrow.style.left = warp.clientWidth / 2 - arrow.offsetWidth + 'px'
            break
        case 'bottom':
            break
        case 'left':
            warp.style.maxWidth = 500 + 'px'
            warp.style.top = (y - warp.clientHeight / 2 + args.el.offsetHeight) + 'px'
            warp.style.left = x - warp.clientWidth  + 100 + 'px'
            arrow.style.top = warp.clientHeight / 2 - arrow.clientHeight - args.el.offsetHeight / 2 + 9 + 'px'
            break
        case 'right':
            warp.style.maxWidth = 500+ 'px'
            warp.style.top = (y - warp.clientHeight / 2 + args.el.offsetHeight) + 'px'
            arrow.style.top = warp.clientHeight / 2 - arrow.clientHeight - args.el.offsetHeight / 2 - 1 + 'px'
            break
        default:
            break
    }
}

function mouseover(args, $event) {
    $event.preventDefault()
    // $event.stopPropagation()
    const check = document.getElementById(args.uuid)
    if (!check) {
        const elW = args.el.offsetWidth
        const elH = args.el.offsetHeight
        const domEl = new DomStyle(args.el)
        const elOffset = domEl.offset()
        let x = $event.clientX
        let y = $event.clientY
        switch (args.p) {
            case 'top':
                x = elOffset.left + elW / 5
                y = elOffset.top - elH / 20
                createTemplate(args, x, y)
                break
            case 'bottom':
                x = elOffset.left / 2
                y = elOffset.top + elH
                createTemplate(args, x, y)
                break
            case 'left':
                x = elOffset.left - elW
                y = elOffset.top - elH / 5
                createTemplate(args, x, y)
                break
            case 'right':
                x = elOffset.left + elW
                /*if ((x + elH / 2) < elOffset.left + elW)
                  x = x + elH
                else
                  x = x + 2*/
                y = elOffset.top - elH / 8
                createTemplate(args, x, y)
                break
            default:
                x = elOffset.left / 2
                y = elOffset.top - elH
                createTemplate(args, x, y)
                break
        }
    }
}

function mouseout(args, $event) {
    $event.preventDefault()
    $event.stopPropagation()
    const el = document.getElementById(args.uuid)
    if (el) {
        el.classList.remove('open')
        el.classList.add('close')
        setTimeout(() => {
            el.remove()
        }, 300)
    }
}
