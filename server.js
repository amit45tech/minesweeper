const dotenv = require('dotenv');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');
// const GameData = require('./models/gameData');
// const RoundData = require('./models/roundData');
const userRoutes = require('./routes/actions');
const bodyParser = require('body-parser');
 
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

dotenv.config();
let port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(cors());
app.use('/', userRoutes);
app.get("/", (req, res) => res.send('HEllo from  new express'));
app.all("*", (req, res) => res.send("This doesn't exist!"));

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch(err => console.log(err));


gameSocket = null;

let users = {};
gameSocket = io.on('connection', function (socket) {
    console.log('a user is connected');

    socket.on("username", (userId) => {

        let nextTile = GetRandomInteger(0,1);

        io.to(socket.id).emit("result", nextTile);
        console.log(userId + "------------------------");
    });
    
    socket.on('disconnect', function () {
        console.log('socket disconnected: ' + socket.id);
    });
})




//Generate a random number between range
function GetRandomInteger(min, max,) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}


server.listen(port, () => {
    console.log("listening to port : ", port);
});
