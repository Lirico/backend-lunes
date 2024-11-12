
// Es un objeto que trae metodos y propiedades para trabajar con un servidor
//No permite configurar acciones HTTP (get post put delete)
const http = require('http');

const PORT = 5000;

const server = http.createServer((request, response) => {
    // Voy a configurar mi ruta raiz (endpoint raiz)
    if(request.url === '/'){
        response.write('Hola, esta es la ruta raiz de mi primer server')
        response.end()
    }
    if(request.url === '/productos'){
        response.write('CD de maluma 90% de descuento, es mas, si te lo llevas te pago.')
        response.end()
    }
})

server.listen(PORT, () => console.log('Server funcionando'));
