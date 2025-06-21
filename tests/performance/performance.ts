import http from 'k6/http';
import { check, sleep } from 'k6';
import dotenv from 'dotenv';

dotenv.config();

const apiBaseUrl = process.env.PI_BASE_URL || 'https://pokeapi.co/api/v2/berry';

export const options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  const res = http.get(apiBaseUrl);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Optional wait between requests to simulate user behavior
  sleep(1);
}
