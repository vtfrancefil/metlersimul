const net = require("net");
let cmdsrv, server;
let cmdSock, sock; 

const random = (low, high) => {
  return (Math.floor((Math.random() * (high - low) + low) * 100)) / 100;
}

const handleCon = (c) => {
  sock = c;
  sock.removeAllListeners();
  // 'connection' listener.
  console.log("client connected");
  sock.on("end", () => {
    console.log("client disconnected");
  });
  sock.on("data", onData);
  sock.write("hello\r\n");
  sock.pipe(sock);
};

const handleCmdCon = (c) => {
  cmdSock = c;
  cmdSock.removeAllListeners();
  // 'connection' listener.
  console.log("cmd client connected");
  cmdSock.on("end", () => {
    console.log("cmd client disconnected");
  });
  cmdSock.on("data", onCmdData);
  cmdSock.write("hello from cmd server\r\n");
  //cmdSock.pipe(c);
};

const srvError = (err) => {
  throw err;
};

const startcompleted = () => {
  console.log("server bound");
  cmdsrv =  net.createServer(handleCmdCon);
  cmdsrv.maxConnections = 1;
  cmdsrv.listen(8125, () => {
    console.log("cmd server bound")
  });
};

const onCmdData = (d) =>{
  var cmd = d.toString().replace(/(\r\n|\n|\r)/gm, "");
  console.log(cmd);

  if(cmd === "1"){
    const seq = random(10, 20,) + '\r\n';
    sock.write(seq);
    console.log("seq sent:" +   seq );
  }

};

const onData = (d) =>{
  console.log(d.toString());
};

server = net.createServer(handleCon);
server.maxConnections = 1;
server.on("error", srvError);
server.listen(8124, startcompleted);
