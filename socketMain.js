const namespaceHelper = require('./namespaceHelpers') 
function socketMain(io) {
    console.log("someonecalled me the SocketMain ! ")
    // // .of - Returns Namespace
    // custom namespaces
    const root = io.of("/");
    
    root.on("connection", function(socket) {
        namespaceHelper.root(socket,io)
    })
};


module.exports = socketMain;