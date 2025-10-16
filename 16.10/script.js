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

const address = {
    city : 'Irkutsk',
    street : "Lenina",
    home : "5"
}
const user = {
    address
}

console.log(user);

const user_clone = structuredClone(user);

console.log(user_clone);

function cloneObject(obj) {
    let keys = Object.keys(obj);
    const newObject = {};
    for (let i = 0; i < keys.length; i++)
    {
        const keyUpper = keys[i][0].toUpperCase() + keys[i].slice(1);
        newObject[keyUpper] = obj[keys[i]];
    }

    return newObject;
}

function cloneObjectTwo(obj)
{
    const newObject = {};
    for (let key in obj)
    {
        if (Object.hasOwn(obj, key))
        {
            const keyUpper = key[0].toUpperCase() + key.slice(1);
            newObject[keyUpper] = obj[key];

            newObject[keyUpper] = typeof newObject[keyUpper] === "object" ? cloneObjectTwo(newObject[keyUpper]) : newObject[keyUpper];

            //if (typeof newObject[keyUpper] === "object")
            //{
            //    newObject[keyUpper] = cloneObjectTwo(newObject[keyUpper]);
            //}
        }
    }

    return newObject;
}

const fcloneObj = cloneObject(user);
console.log(fcloneObj);

const cloneTwo = cloneObjectTwo(user);
console.log(cloneTwo);