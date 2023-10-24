require("dotenv").config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
const port = 8000
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');
require('./routes/user.routes')(app)
require('./routes/expense.routes')(app)
require('./routes/income.routes')(app)
require('./routes/transaction.routes')(app)

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});
io.on("connection", socket => {
  
    socket.on("getDataFromReact", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
        //     "event_from_client" event
        console.log("at server everything is ok")
        io.emit("toClient", data);
    });


    // app.listen(8000, () => {
    //     console.log("Listening at Port 8000")
})