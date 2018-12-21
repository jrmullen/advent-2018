const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let entries = [];
for (let element of input) {
    let entry = {};
    let split = element.split(']');

    entry.timestamp = split[0].replace('[', '').trim();
    entry.action = split[1].replace(']', '').trim();
    entry.id = entry.action.replace(/[^0-9]/g, '');

    entries.push(entry);
}

// Sort entries by timestamp
entries.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
});

let guards = [];
let activeGuard;
let asleep;
for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];

    // Guard change
    if (entry.action[0].toLowerCase() === 'g') {
        // Set current guard
        activeGuard = guards.find(obj => {
            return obj.id === entry.id;
        });

        // Create new guard if it does not exist yet
        if (activeGuard === undefined) {
            activeGuard = createNewGuard(entry);
            guards.push(activeGuard);
        }
    }

    // Falls asleep
    if (entry.action[0].toLowerCase() === 'f') {
        // Save time asleep
        asleep = new Date(entry.timestamp).getMinutes();
    }

    // Wakes up
    if (entry.action[0].toLowerCase() === 'w') {
        // Calculate spent sleeping
        let wake = new Date(entry.timestamp).getMinutes();

        for (let j = asleep; j < wake; j++) {
            activeGuard.sleepSchedule[j]++;
        }
    }
}

// Find the guard that was asleep the longest
for (let guard of guards) {
        guard.totalSleep = guard.sleepSchedule.reduce(getSum);
}

// Sort guards by total sleeping time
entries.sort((a, b) => {
    return b.totalSleep - a.totalSleep;
});

let sleepiestGuard = guards[0];
console.log('Guard ' + sleepiestGuard.id + ' slept the longest with ' + sleepiestGuard.totalSleep + ' minutes');

// Get the minute that the guard slept the longest
let mostCommonMinute = 0;
let highest = 0;
for (let i = 0; i < sleepiestGuard.sleepSchedule.length; i++) {
    if (sleepiestGuard.sleepSchedule[i] > highest) {
        mostCommonMinute = i;
        highest = sleepiestGuard.sleepSchedule[i];
    }
}

console.log('Slept the most during minute ' + mostCommonMinute);

let part1 = sleepiestGuard.id * mostCommonMinute;
console.log('Part 1: ' + part1);

function getSum(total, number) {
    return total + number;
}

function createNewGuard(entry) {
    let guard = {};
    guard.id = entry.id;
    guard.sleepSchedule = new Array(60).fill(0);

    return guard;
}