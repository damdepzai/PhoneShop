

export class Validate {
    required(val) {
        return (val === '' || val === null)
    }

    isNull(val) {
        if (val === null) return true

        if (Array.isArray(val))
            return val.length > 0

        return !String(val).length > 0
    }

    isMax(val, ...args) {
        if (typeof val === 'number')
            return args[1] ? val >= args[0] : val > args[0]
        else
            return args[1] ? String(val).length >= args[0] : String(val).length > args[0]

        return false
    }

    isMin(val, ...args) {
        if (typeof val === 'number')
            return args[1] ? val <= args[0] : val < args[0]
        else
            return args[1] ? String(val).length <= args[0] : String(val).length < args[0]

        return false
    }

    isNumber(val) {
        return String(val).match(/[0-9]+/)
    }

    isEq(val1, val2) {
        return String(val1) === String(val2)
    }

    isPhone(val, rex) {
        let re = /\d/;
        if (rex)
            re = rex
        return re.test(val);
    }

    isEmail(val) {
        const re = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
        return re.test(val);
    }

    isGreaterDate(date1, date2){
        return moment(date1) >= moment(date2)
    }

    compareDate(date1, date2){
        return moment(date1) > moment(date2)
    }

    isEmailRegex(val) {
        return String(val).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
    }

    isEmailPm(val) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    }

    isEmailJP(val) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(val);
    }

    isPasswordRegex(val){
        const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$")
        return reg.test(val)
    }

    formatManMonth(val) {
        if (typeof val !== 'string')
            val = val.toString()
        const regex = /^[\d]+([.][\d1])?$/miu; // ex: 3.5, 43.6
        return regex.test(val)
    }

    isURL(val) {
        const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        return re.test(val);
    }
    isPassword(val){
        const  re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
        return re.test(val);
    }
    confirmPassword(val){
        const  re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
        return re.test(val);
    }
}

const validate = new Validate()

export default validate
