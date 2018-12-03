const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let trips = 0;
let dubs = 0;

for (let element of input) {

    let count = {};
    element.split('').forEach((char) => {
        count[char] ? count[char]++ : count[char] = 1;
    });

    // Convert to array
    let array = Object.values(count);

    if (array.includes(2)) {
        dubs++;
    }

    if (array.includes(3)) {
        trips++;
    }
}

let checkSum = dubs * trips;

console.log('Part 1: ' + checkSum);