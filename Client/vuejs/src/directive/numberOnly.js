export default {
    bind: function (el, binding, vnode) {
        let handler = function (e) {
            if(binding.value.isNumeric){
                let regex = /^[0-9]*$/
                if (!regex.test(e.target.value)) {
                    e.target.value = e.target.value.substr(0, e.target.value.length - 1)
                    vnode.elm.dispatchEvent(new CustomEvent('input'))
                }
            }
        }
        el.addEventListener("input", handler)
    }
}
