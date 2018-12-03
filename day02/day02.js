const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let trips = 0;
let dubs = 0;
let isAnswered = false;

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

    input.forEach((str) => {
        let difference = 0;
        let commonChars = '';

        for (let i = 0; i < str.length; i++) {
            if (str[i] !== element[i]) {
                difference++;
            } else {
                commonChars += str[i];
            }
        }

        if (difference === 1 && !isAnswered) {
            console.log('Part 2: ' + commonChars);
            isAnswered = true;
        }
    });

}

console.log('Part 1: ' + dubs * trips);