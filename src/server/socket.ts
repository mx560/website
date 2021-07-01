const ws = require('nodejs-websocket');
const port = 3999;
let count = 0;

const server = ws.createServer((conn) => {

    count++;

    conn.userName = `用户:${count}`;

    broadcast(conn.userName + ',进入系统！');

    conn.on('text', data => {
        broadcast(data);
    });

    conn.on('close', data => {
        count--;
        console.log('关闭连接');
    });

    conn.on('error', data => {
        console.log('发生异常');
    });
});

const broadcast = (msg) => {
    server.connections.forEach(function (conn) {
        console.log('server.js line:33 -> conn-- ->  ');
        conn.send(msg)
    })
}

const startServer = () => {
    server.listen(port, () => {
        console.log('start success at:%d', port);
    });
}

startServer();
