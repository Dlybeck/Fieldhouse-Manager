import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const server = createServer(async (req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        try {
            const filePath = join(process.cwd(), 'index.html');
            const content = await readFile(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});


// run with `node server.mjs`
