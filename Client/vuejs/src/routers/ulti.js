
export const LoadComponent = (path) => () => import(`@/${path}.vue`)

export const LoadView = (name, index = false) =>
    LoadComponent(`resources/views/${name}${index ? '/index' : ''}`)

