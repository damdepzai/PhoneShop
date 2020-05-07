

export default {
  data: () => ({
    errors: {}
  }),
  methods: {
      _isError(group = null) {
          if(group){
              return (this.errors[group]&&_.isObject(this.errors[group])&&Object.keys(this.errors[group]).length)
          }

          if(_.isObject(this.errors) && !Object.keys(this.errors).length)
            return  false

          return Object.keys(this.errors).every((name)=>{
              return this.errors[name] && this.errors[name].length > 0
          })
      },
    getError(name, group = null) {
      if (this.hasError(name, group))
        if (group)
          return this.errors[group][name]
        else
          return this.errors[name]

      return ''
    },
    hasError(name, group = null) {
      if (group)
        return (group in this.errors) && (name in this.errors[group])
      else
        return name in this.errors
    },
    setError(name, msg, group = null) {
      if (group) {
        if (!(group in this.errors))
          this.$set(this.errors, group, {})
        this.$set(this.errors[group], name, msg)
      } else
        this.$set(this.errors, name, msg)
    },
    removeError(name, group = null) {
      if (group && (group in this.errors) && (name in this.errors))
        delete this.errors[group][name]
      else if (name in this.errors)
        delete this.errors[name]
    },
    resetError(group = null) {
      if (group && (group in this.errors))
        this.errors[group] = {}
      else
        this.errors = {}
    }
  }
}
