const http = require('http')

http.createServer((request, response) => {
    response.end('hello node')
})
.listen(4000, () => console.log('o servidor está rodando'))