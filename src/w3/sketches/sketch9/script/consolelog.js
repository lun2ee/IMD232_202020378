console.log('2');
console.log('문자');
console.log(true);

const two = 2;
console.log(two);

const four = 4;
console.log(four);

let undefinedVal;
console.log(undefinedVal);

const additionConst = two + four;
console.log(additionConst);

let addition = two + four;
console.log(addition);

let subtraction = two - four;
console.log(subtraction);

let multiplication = two * four;
console.log(multiplication);

let division = two / four;
console.log(division);

// additionConst = additionConst + two;
// console.log(additionConst);

addition = addition + two;
console.log('더하기', addition);
addition += two;
console.log('더하기', addition);

subtraction = subtraction - two;
console.log('빼기', subtraction);
subtraction -= two;
console.log('빼기', subtraction);
subtraction += -two;
console.log('빼기', subtraction);
subtraction += -1 * two;
console.log('빼기', subtraction);

multiplication = multiplication * two;
console.log('곱하기', multiplication);
multiplication *= two;
console.log('곱하기', multiplication);

console.log('square, 제곱', 8 ** 2);
console.log('세제곱', 8 ** 3);
console.log('rootaquare,제곱근', 4 ** (1 / 2));

division = division / two;
console.log('나누기', division);
division /= two;
console.log('나누기', division);
division *= 1 / two;
console.log('나누기', division);

let counter = 0;
counter += 1;
console.log('counter', counter);
counter += 1;
console.log('counter', counter);
counter++;
console.log('counter', counter);
counter++;
console.log('counter', counter);
counter++;
console.log('counter', counter);
counter--;
console.log('counter', counter);
let remainder = counter % 8;
