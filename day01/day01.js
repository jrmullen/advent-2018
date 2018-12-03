const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(x => parseInt(x.trim()));

let frequency = 0;
let isAnswered = false;
let frequencies = [];

for (let i = 0; i < input.length; i = (i + 1) % input.length) {

    frequency += input[i];

    if (i === input.length - 1 && !isAnswered) {
        console.log('Part 1: ' + frequency);
        isAnswered = true;
    }

    if (frequencies.includes(frequency)) {
        console.log('Part 2: ' + frequency);
        break;
    }

    frequencies.push(frequency);
}
