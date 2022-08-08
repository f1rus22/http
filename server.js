const http = require('http');
const fs = require('fs');



filenames = fs.readdirSync('./files');


const host = 'localhost';
const port = 8000;


const requestListener = (req, res) =>{
    if(req.method === 'POST' && req.url ==='/post'){
        res.writeHead(200);
        res.end('sucess');
    }else if ( req.method != 'POST' && req.url === '/post'){
        res.writeHead(405);
        res.end('HTTP method not allowed');
    } else if(req.method === 'DELETE' && req.url ==='/delete'){
        res.writeHead(200);
        res.end('sucess');
    }else if ( req.method != 'DELETE' && req.url === '/delete'){
        res.writeHead(405);
        res.end('HTTP method not allowed');
    } else if (req.method != 'GET'){
        res.writeHead(405);
        res.end('HTTP method not allowed');
    } else if(filenames === false){
        res.writeHead(500);
        res.end('Internal server error');
    } else if(req.url === '/get'){
        res.writeHead(200);
        res.end('Filenames in directory: ' + filenames.toString());
    }else if (req.url === '/redirect'){
        res.writeHead(302, {
            Location: "/redirected"
        });
        res.end();
    } else if (req.url === '/redirected'){
            res.writeHead(200);
            res.end("the new url: /redirected");
        }else { 
    res.writeHead(404);
    res.end('Not found')
    }
};


const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Сервер запущен и доступен по адресу http://${host}:${port}`);
});
