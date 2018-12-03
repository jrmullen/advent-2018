const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(x => parseInt(x.trim()));

// Part 1
let frequency = 0;

for (let element of input) {
    frequency += element;
}

console.log('Part 1: ' + frequency);

// Part 2
frequency = 0;
let frequencies = [];

for (let i = 0; i < input.length; i = (i + 1) % input.length) {
    frequency += input[i];

    if (frequencies.includes(frequency)) {
        console.log('Part 2: ' + frequency);
        break;
    }

    frequencies.push(frequency);
}
