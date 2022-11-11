#!/usr/bin/env node

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';

const args = minimist(process.argv.splice(2));

if (args.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.`
        );
        process.exit(0);
}

let latitude = args.n || (args.s * -1);
let longitude = args.e || (args.w * -1);

let timezone = moment.tz.guess();
if (args.z) {
    timezone = args.z;
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);

const data = await response.json();

if (args.j) {
    console.log(data);
}

const days = args.d 

if (data.daily.precipitation_hours[days] != 0) {
    console.log('You might need your galoshes');
}
else {
    console.log('You will not need your galoshes');
}

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

process.exit(0);