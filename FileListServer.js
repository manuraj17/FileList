var FileListServer = {};

FileListServer.test = function(){
  console.log("Hello, World!");
};



FileListServer.read = function(path, done){

  var fs = require('fs');
  var path = require('path');
  var resp = [];
  var root = __dirname;

  fs.readdir(root, function(err, files){

    for(i in files){
      var file = path.join(__dirname, files[i]);
      var stats = fs.statSync(file);

      if(stats.isFile()){
        //console.log(files[i] + "\t\t" + "File");
        var r = {
          "Name": files[i],
          "Type": "File"
        };

        resp.push(r);

      }else {

        var r = {
          "Name": files[i],
          "Type": "Directory"
        };

        resp.push(r);
      }
    }
    done(JSON.stringify(resp));
    //console.log(resp);
    //c.write(JSON.stringify(resp));
  });


}

var req = {
  "command": "CD",
  "arg": "testDirectory"
}

FileListServer.parse = function(data){

}

FileListServer.start = function(port){
  var net = require('net');
  var _this = this;

  var server = net.createServer();

  server.listen(5432, function(c){
    console.log("Server started...\n");
  });

  server.on('connection', function(c){
    console.log("Client connected\n");

    c.on('data', function(data){
      data = JSON.parse(data);
      if(data.command == "ls"){
        _this.read(root, function(r){
          c.write(r+"\n");
        });

      }

    });
  });

}

module.exports = FileListServer;
