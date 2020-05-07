

export default (Vue) => {
    Vue.component('logo', () => import('./Logo'))
    Vue.component('Loading', () => import('./loading'))
}
