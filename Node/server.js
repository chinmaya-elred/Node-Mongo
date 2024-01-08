console.log("Hello, Node.js!");

const http =  require('http');
http.createServer((req, res) =>{
   res.write('This is just a start')
   res.end()

}).listen(8080)