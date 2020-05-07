
export default (() => {
    const state = new WeakMap()
    return {
        bind(el, binding, vNode) {
            const data = {
                start: null,
                cancel: null,
                obs: null
            }
            const options = {delay: 400, interval: 50}
            if (binding.arg) {
                const opt = binding.arg.split(',')
                if (opt[0])
                    options.delay = opt[0]
                if (opt[1])
                    options.interval = opt[1]
            }

            if (typeof binding.value !== 'function') {
                const compName = vNode.context.name
                let warn = `[longclick:] provided expression '${binding.expression}' is not a function, but has to be`
                if (compName) {
                    warn += `Found in component '${compName}' `
                }
                console.warn(warn)
            }

            let pressTimer = null
            let pressInterval = null
            let disable = false
            data.start = (e) => {
                if (e.type === 'click' && e.button !== 0) {
                    return
                }

                if (pressTimer === null) {
                    pressTimer = setTimeout(() => {
                        if (options.interval && options.interval > 0) {
                            pressInterval = setInterval(() => {
                                handler()
                            }, options.interval)
                        }
                        handler()
                    }, options.delay)
                }
            }

            // Cancel Timeout
            data.cancel = () => {
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
                if (pressInterval) {
                    clearInterval(pressInterval)
                    pressInterval = null
                }
            }
            // Run Function
            const handler = (e) => {
                      if (!disable)
                          binding.value(e)
                  }

            ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, data.start))
            ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, data.cancel))


            const config = {attributes: true, childList: false, subtree: false};

            const callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type == 'attributes') {
                        disable = el.hasAttribute('disabled')
                    }
                }
            };
            data.obs = new MutationObserver(callback);

            data.obs.observe(el, config);

            state.set(el, data)

            // observer.disconnect();
        },
        unbind(el, binding, vNode) {
            const data = state.get(el)
            ;['mousedown', 'touchstart'].forEach(e => el.removeEventListener(e, data.start))
            ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.removeEventListener(e, data.cancel))
            data.obs.disconnect();
        }
    }
})()
