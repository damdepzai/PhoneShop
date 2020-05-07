

export default {
  install(Vue, options) {
    Vue.component('date-picker', () => import('./components/date-picker'));
  },
};
