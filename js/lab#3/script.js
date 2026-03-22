function countFibonacciSequenceSum() {
    let sum = 0, count = 0, a = 0, b = 1;
    while (count < 10) {
        let nextNumber = a + b;
        sum += a;
        a = b;
        b = nextNumber;
        count++;
    }
    return sum;
}


function sumPrimeNumbers() {
    let sum = 0;

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;

        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            sum += i;
        }
    }
    return sum;
}


function dayOfWeek(){
    let number = prompt("Enter a number from 1 to 7");

    number = Number(number);

    switch (number) {
        case 1:
            alert("Monday");
            break;
        case 2:
            alert("Tuesday");
            break;
        case 3:
            alert("Wednesday");
            break;
        case 4:
            alert("Thursday");
            break;
        case 5:
            alert("Friday");
            break;
        case 6:
            alert("Saturday");
            break;
        case 7:
            alert("Sunday");
            break;
        default:
            alert("Invalid number");
    }
}
dayOfWeek();


function removeEvenLengthString(stringArray) {
    if (stringArray.length === 0){
        return "Nothing to work with!";
    }
    for (let i = stringArray.length - 1; i >= 0; i--) {
        if (stringArray[i].length % 2 === 0) {
            stringArray.splice(i, 1);
        }
    }
    return stringArray;
}


const plusOne = (numbers) => {
    let result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(numbers[i] + 1);
    }
    return result;
};
let nums = [1, 2, 3, 4, 5];

const checkTen = (a, b) => (a + b === 10) || Math.abs(a - b) === 10;

console.log("Сума перших 10 чисел Фібоначчі:", countFibonacciSequenceSum());
console.log("Сума простих чисел від 1 до 1000:", sumPrimeNumbers());
console.log("Завдання 4:", removeEvenLengthString(["cat", "dog", "fish", "bird"]));
console.log("Завдання 5:", plusOne(nums));
console.log("Завдання 6 (2, 12):", checkTen(2, 12));
console.log("Завдання 6 (4, 5):", checkTen(4, 5));