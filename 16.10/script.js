// === пример доступа к полям ===
const a =  {
    'name': "name",
    'name space': 'example'
}
const field = 'name';
console.log(a.name, a[field], )


// === ссылка - значение ====
// в переменной всегда хранится значение. Если в переменную "положили" объкт,
// то там оказалась ссылка на этот объект

const b = a;
b.name = 'other';

const c = Object.assign({}, a)

console.log({'a === b': a === b})
console.log({'a === c': a === c})
console.log({a})

// === Отличия in и hasOwnProperty. ===

const array = {};
// array.count = 2; собственное поле
array.__proto__.count = 2
array.length = 2


console.log({"'length' in array": 'length' in array})
console.log({"Object.hasOwn(array, 'length')": Object.hasOwn(array, 'length')})


console.log({"'count' in array": 'count' in array})
console.log({"Object.hasOwn(array, 'count')": Object.hasOwn(array, 'count')})

console.log({'Object.entries(array)': Object.entries(array)})
