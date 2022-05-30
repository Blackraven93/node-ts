import http from 'http';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { parse } from 'querystring';

dotenv.config();

interface IUser {
  userId: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  created: Date;
}

const hostname = process.env.HOST;
const port = Number(process.env.PORT);

interface MimeType {
  html: string;
  js: string;
  css: string;
  json: string;
  png: string;
  jpg: string;
  gif: string;
  svg: string;
  wav: string;
  mp4: string;
  woff: string;
  ttf: string;
  eot: string;
  otf: string;
  wasm: string;
}

const server = http.createServer((req, res) => {
  let filePath = `.${req.url}`;
  filePath === './' && (filePath = './index.html');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Headers': '*',
  };

  // if (req.method === 'OPTIONS') {
  //   console.log('OPTIONS');
  //   res.writeHead(204, headers);
  //   res.end();
  //   return;
  // }

  // if (['GET', 'POST', 'DELETE'].includes(req.method || 'GET')) {
  //   req.on('data', (chunk) => {
  //     console.log(chunk.toString());
  //   });

  //   res.writeHead(200, headers);
  //   res.end();
  //   return;
  // }

  // if (req.method === 'POST') {
  //   let body = '';
  //   req.on('data', (chunk) => {
  //     body += chunk.toString(); // convert Buffer to string
  //   });
  //   req.on('end', () => {
  //     console.log(`parse: ${parse(body)}`);
  //     res.end('ok');
  //   });
  // }

  let extname = String(path.extname(filePath)).toLowerCase();
  extname = extname.split('').splice(1, extname.length).join('');

  const mimeTypes: MimeType = {
    html: 'text/html',
    js: 'text/javascript',
    css: 'text/css',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    wav: 'audio/wav',
    mp4: 'video/mp4',
    woff: 'application/font-woff',
    ttf: 'application/font-ttf',
    eot: 'application/vnd.ms-fontobject',
    otf: 'application/font-otf',
    wasm: 'application/wasm',
  };

  const contentType =
    mimeTypes[extname as keyof MimeType] || 'application/octet-stream';

  fs.readFile('./src/view/index.html', (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', (error, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(
          'Sorry, check with the site admin for error: ' + error.code + ' ..\n'
        );
      }
    } else {
      const user = {
        userId: 1,
        userName: 'Raven',
        userEmail: 'blackraven@gmail.com',
        userPassword: '1231234',
        created: new Date(),
      };

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });

  fs.readFile('./src/view/path.html', (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', (error, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(
          'Sorry, check with the site admin for error: ' + error.code + ' ..\n'
        );
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
