const { readFile } = require('fs')
const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
	// normalize url by removing querystring, optional
	// trailing slash, and making it lowercase
	const path = req.url.replace(/\/?(?:\?.*)?$/,
		'').toLowerCase()

	switch (path) {
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html')
			break
		case '/about':
			serveStaticFile(res, '/public/about.html',
				'text/html')
			break
		case '/img/logo.png':
			serveStaticFile(res, '/public/img/logo.png',
				'image/png')
			break
		default:
			serveStaticFile(res, '/public/404.html', 'text/html',
				404)
			break
	}

})

function serveStaticFile(res, path, contentType, responseCode = 200) {
	readFile(__dirname + path, (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' })

			return res.send('500 - internal Error')
		}

		res.writeHead(responseCode, {
			'Content-Type': contentType
		})

		res.end(data)
	})
}

server.listen(port, () => console.log(`server started on
port ${port}; ` +
	'press Ctrl-C to terminate....'))