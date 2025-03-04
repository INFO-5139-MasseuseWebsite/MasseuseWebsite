
export const OR = (typeA, typeB) => v => {
    const [valid, value] = checkType(typeA, v)
    if(valid) return [valid, value]
    return checkType(typeB, v)
}
export const AND = (typeA, typeB) => v => {
    const [valid, value] = checkType(typeA, v)
    if(!valid) return [valid, value]
    return checkType(typeB, value)
}
export const NULLABLE = type => OR(DATA_TYPES.NULL, type)
export const DATA_TYPES = {
    NULL: v => [v == undefined, null],
    NUMBER: typeof 0,
    INTEGER: v => [Number.isSafeInteger(v), v],
    STRING: typeof '',
    ARRAY: v => [Array.isArray(v), v]
}
export const ARRAY_T = type => AND(DATA_TYPES.ARRAY, v=>[v.filter(vv => checkType(type, vv)).length === v.length, v])
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const EMAIL = AND(DATA_TYPES.STRING, v=>[emailRegex.test, v])

export function checkType(type, value) {
    if (typeof type === 'string')
        return [typeof value === type, value]
    if (typeof type === 'function')
        return type(value)
    if(!value)
        return [false, value]
    const ret = {}
    let validRet = true
    for (let [key, keyType] of Object.entries(type)) {
        const [valid, keyValue] = checkType(keyType, value[key])
        if (valid)
            ret[key] = keyValue
        else
            validRet = false
    }
    return [validRet, ret]


    // return typeof type === 'string' ? typeof value === type : type(value)
}
