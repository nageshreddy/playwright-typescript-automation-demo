import http from 'k6/http';
import { check, sleep } from 'k6';
dotenv.config();

const uiBaseUrl = process.env.UI_BASE_URL || 'https://fallback-url.com';

export const options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  const res = http.get('https://pokeapi.co/api/v2/berry');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Optional wait between requests to simulate user behavior
  sleep(1);
}
