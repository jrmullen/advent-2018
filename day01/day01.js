const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(x => parseInt(x.trim()));;

let frequency = 0;

for (let element of input) {
    frequency += element;
}

console.log('Part 1: ' + frequency);
