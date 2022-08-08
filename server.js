const http = require('http');
const fs = require('fs');






const host = 'localhost';
const port = 8000;


const requestListener = (req, res) =>{
    if(req.url ==='/post'){
        if (req.method === 'POST'){
            res.writeHead(200);
            res.end('sucess');
        } else {
            res.writeHead(405);
            res.end('HTTP method not allowed');
        }
    } else if(req.url ==='/delete'){
        if (req.method === 'DELETE'){
            res.writeHead(200);
            res.end('sucess');
        } else {
            res.writeHead(405);
            res.end('HTTP method not allowed');  
        }
    } else if (req.method != 'GET'){
        res.writeHead(405);
        res.end('HTTP method not allowed');
    } else if(req.url === '/get'){
        if (req.method === 'GET'){
            try {
                const filenames = fs.readdirSync('./files');
                res.writeHead(200);
                res.end('Filenames in directory: ' + filenames.toString());
            } catch (error){
                res.writeHead(500);
                res.end('Internal server error');
            }
        } 
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
