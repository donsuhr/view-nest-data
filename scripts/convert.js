/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies

const inAppData = require('../data/inapp.json');

function leadingZero(val) {
  const inNum = parseInt(val, 10);
  if (inNum < 10) {
    return `0${inNum}`;
  }
  return inNum;
}

function okayDate(date) {
  return (
    (date.getMonth() === 11 && date.getDate() === 27)
    || (date.getMonth() === 11 && date.getDate() === 28)
  );
}

inAppData.objects[0].value.days.forEach(({ day, cycles }) => {
  if (day === '2019-12-27') {
    console.log('in app data:');
    cycles.forEach(({ start, duration }) => {
      const h = leadingZero(Math.floor(start / 3600));
      const m = leadingZero(Math.floor((start % 3600) / 60));
      const s = leadingZero(Math.floor((start % 3600) % 60));
      console.log(`${day} ${h}:${m}:${s} \t ${duration}s`);
    });
    console.log('');
  }
});

glob('./data/takeout-1/2019/12/**/*.json', (err, files) => {
  console.log('checking', files.length, 'files');
  console.dir(files);
  let dayTotal = 0;
  files.forEach((x) => {
    const filedata = fs.readFileSync(x, 'utf8');
    const data = JSON.parse(filedata);

    Object.values(data).forEach((day) => {
      Object.values(day.cycles).forEach((cycle) => {
        const localDate = new Date(cycle.startTs);
        if (okayDate(localDate)) {
          console.log(
            `${leadingZero(localDate.getFullYear())}-${leadingZero(
              localDate.getMonth(),
            ) + 1}-${leadingZero(localDate.getDate())} ${leadingZero(
              localDate.getHours(),
            )}:${leadingZero(localDate.getMinutes())}:${leadingZero(
              localDate.getSeconds(),
            )} \t ${cycle.duration} \t ${cycle.caption.plainText} `,
          );
          dayTotal += parseInt(cycle.duration, 10);
        }
      });
    });

    console.log('total:', (dayTotal / 60 / 60).toFixed(2), 'hr');
  });
});
