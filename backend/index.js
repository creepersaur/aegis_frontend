const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3000;
const server = http.createServer(app);
const cors = require("cors");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/auth-status', require('./routes/auth-status'));
app.use('/account', require('./routes/account'));
app.use('/profile', require('./routes/profile'));
app.use('/contacts', require('./routes/contacts'));
app.use('/devices', require('./routes/devices'));

require('./websockets')(io);

server.listen(port, () => {
    console.log(`App is listening at ${port}.`);
});