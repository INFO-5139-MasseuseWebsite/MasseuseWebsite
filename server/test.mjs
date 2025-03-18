import checkType, { ARRAY_T, EMAIL, STRING } from "./formParser.js";

const [valid, value] = checkType({
    arr_str: ARRAY_T(EMAIL)
}, {
    arr_str: ['a@a.c', '']
})

console.log(valid, value)