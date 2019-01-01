
export default function fjson(url, options = {}) {
  return fetch(url, options).then(res => res.json());
}
