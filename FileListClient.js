var net = require('net');

var str = {
  "command": "ls",
  "arg" : "root"
}

var client = net.connect(5432, function(){
  console.log("Connected to server!\n");
  client.write(JSON.stringify(str));

});

client.on('data', function(data){
  data = JSON.parse(data);
  console.log(data);
});

client.on('end', function(){
  console.log('Disconnected!\n');
});
