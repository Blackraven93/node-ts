import http from 'http';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pg = new Pool({
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.DB_PORT),
});

pg.query('SELECT * FROM member;', (err, res) => {
  try {
    console.log(res.rows);
  } catch (error) {
    console.error(err, error);
  }
});

interface IUser {
  userId: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  created: Date;
}

const insertMember = async (user: IUser): Promise<boolean> => {
  try {
    await pg.connect();
    await pg.query(
      `INSERT INTO "member" ("id", "name", "email", "password", "created")  
        VALUES ($1, $2, $3, $4, $5)`,
      [
        user.userId,
        user.userName,
        user.userEmail,
        user.userPassword,
        user.created,
      ]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await pg.end();
  }
};

const createTable = (): void => {
  const query = `CREATE TABLE student(id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, age INT NOT NULL, address VARCHAR(255), email VARCHAR(50));`;
  pg.query(query, (err, res) => {
    try {
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  });
};

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

  console.log(filePath);

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
      insertMember(user);

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
