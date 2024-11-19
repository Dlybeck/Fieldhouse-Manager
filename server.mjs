import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const server = createServer(async (req, res) => {
    const publicDir = join(process.cwd(), 'public'); // Define the public directory
    let filePath = join(publicDir, req.url);

    // Default to index.html for root requests
    if (req.url === '/' || req.url === '/signin.html') {
        filePath = join(publicDir, 'signin.html');
    }

    try {
        // Determine file type
        const ext = filePath.split('.').pop();
        const contentType = {
            html: 'text/html',
            js: 'application/javascript',
            css: 'text/css',
        }[ext] || 'text/plain';

        // Read and serve the file
        const content = await readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});

app.post('/signingo', (req,res) => {



    
})