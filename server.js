const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const body = [];

  req.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
    body.push(chunk);
  });

  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log('Request Body:', parsedBody);

    res.setHeader('Content-Type', 'text/html');

    // Serve form on GET /
    if (req.url === '/' && req.method === 'GET') {
      res.write('<html>');
      res.write('<head><title>Home Page</title></head>');
      res.write('<body>');
      res.write('<form action="/about" method="POST">');
      res.write('<input type="text" name="username" placeholder="Enter your name" />');
      res.write('<button type="submit">Submit</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      res.end();

    // Handle GET /about?username=value
    } else if (req.url.toLowerCase().startsWith('/about') && req.method === 'GET') {
      const parsedUrl = url.parse(req.url);
      const queryParams = querystring.parse(parsedUrl.query);
      const username = queryParams.username || 'Guest';

      res.write('<html>');
      res.write('<head><title>About Page</title></head>');
      res.write('<body>');
      res.write(`<h1>Hello, ${username}!</h1>`);
      res.write('</body>');
      res.write('</html>');
      res.end();

    } else {
      res.statusCode = 404;
      res.write('<html>');
      res.write('<head><title>404 Not Found</title></head>');
      res.write('<body><h1>404 Not Found</h1></body>');
      res.write('</html>');
      res.end();
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
