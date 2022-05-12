import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

console.log(hostname, port);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(() => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
