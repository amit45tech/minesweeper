var socket = io('http://localhost:5000');


function selectedCoin(){
  socket.emit("username", "amit");
}

socket.on('result', data => {
  console.log(data);
})