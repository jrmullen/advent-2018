const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let ids = [];
let offsets = [];
let sizes = [];
let count = 0;

input.forEach((element) => {
    let split = element.split('@');

    ids.push(split[0].trim().replace('#', '')); // Left of @, trimmed
    offsets.push(split[1].split(':')[0].trim()); // Between @ and :, trimmed
    sizes.push(split[1].split(':')[1].trim()); // Right of :, trimmed
});

// Create empty matrix 1000x1000
let matrix = [];
for (let i = 0; i < 1000; i++) {
    matrix[i] = [];
    for (let j = 0; j < 1000; j++) {
        matrix[i][j] = 0;
    }
}

for (let i = 0; i < input.length; i++) {
    let leftOffset = parseInt(offsets[i].split(',')[0]); // Left of ,
    let topOffset = parseInt(offsets[i].split(',')[1]); // Right of ,

    let width = parseInt(sizes[i].split('x')[0]); // Left of ,
    let height = parseInt(sizes[i].split('x')[1]); // Right of ,

    // Populate matrix
    for (let w = leftOffset; w < leftOffset + width; w++) {
        for (let h = topOffset; h < topOffset + height; h++) {
            matrix[w][h]++;
        }
    }
}

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] >= 2) {
            count++;
        }
    }
}

for (let i = 0; i < input.length; i++) {
    let leftOffset = parseInt(offsets[i].split(',')[0]); // Left of ,
    let topOffset = parseInt(offsets[i].split(',')[1]); // Right of ,

    let width = parseInt(sizes[i].split('x')[0]); // Left of ,
    let height = parseInt(sizes[i].split('x')[1]); // Right of ,

    let isOverlapping = false;

    // Populate matrix
    for (let w = leftOffset; w < leftOffset + width; w++) {
        for (let h = topOffset; h < topOffset + height; h++) {
            if(matrix[w][h] > 1 || matrix[w][h] === 0) {
                isOverlapping = true;
            }
        }
    }

    if (!isOverlapping) {
        console.log('Part 2: ' + ids[i]);
        break;
    }
}

console.log('Part 1: ' + count);