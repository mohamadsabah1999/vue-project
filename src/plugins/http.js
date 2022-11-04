const DEV = false;
const API_ROOT = !DEV ? "https://turtanu-ali.herokuapp.com" : "http://127.0.0.1:8000";

export default (url, method, body) => fetch(`${API_ROOT}/${url}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "none"
  },
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": body,
  "method": method,
  "mode": "cors",
  "credentials": "include"
});
