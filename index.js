import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import mongoose from 'mongoose';
import Blog from './models/Blog.js';

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

// app.post('/signingo', (req,res) => {
// })



mongoose.connect("mongodb+srv://dlybeck383:M0ng0PassW0rd@testcluster.gkev5.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster")

// Create a new blog post and insert into database
const article = await Blog.create({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  console.log(article);