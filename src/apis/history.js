
import _json from './_fjson';

function makeLink(resource) {
  return `https://s3.amazonaws.com/pewds-data/${resource}`;
}

function get(resource) {
  return _json(makeLink(resource));
}

export default {
  events: () => get('events.json'),
  subhistory(channel, year) {
    return get(`subhistory/${channel}/${year}_r.json`);
  },
};
