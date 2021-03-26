const events = require('../database/events.js').default;
const stringTable = require('string-table');
const DAY = 60 * 60 * 24 * 1000; // in ms

/*
 respond to event call
 return the upcoming events within 30days
 */
const getEvents = () => {
  let events_f = []; // filtered events

  let now = Date.now();

  events.forEach((e) => {
    let date = new Date(e.date);
    if ((date - now < 30 * DAY) & (date - now > -1 * DAY)) {
      // include this event in the report
      events_f.push(e);
    }
  });

  // output events
  if (events_f.length == 0) {
    return {
      text: `Sorry, no upcoming events`,
      mode: 'HTML',
    };
  } else {
    let table = stringTable.create(events_f);
    console.log(table);
    return {
      text: `<pre> ${table} </pre>`,
      mode: 'HTML',
    };
  }
};

module.exports.getEvents = getEvents;
