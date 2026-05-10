import express from "express";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { createServer } from 'node:http';

import { Server } from 'socket.io';

const app = express();
config({ path: "./config/config.env" });

app.use(
    cors({
        origin: [
            process.env.FRONTEND_URI,
            "*",
            "http://localhost:3000",
            "http://localhost:5173",
            "http://192.168.0.101:3000",
            "http://192.168.0.105:3000",
            "https://nexus-major-project.vercel.app"
        ],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorMiddleware);




const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const ROOM = 'group';
const activeUsers = new Map();

async function emitActiveUserCount() {
    io.to(ROOM).emit('activeUsers', activeUsers.size);
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('joinRoom', async (userName) => {
        console.log(`${userName} is joining the group.`);

        activeUsers.set(socket.id, userName);
        await socket.join(ROOM);
        await emitActiveUserCount();

        // send to all
        // io.to(ROOM).emit('roomNotice', userName);

        // broadcast
        socket.to(ROOM).emit('roomNotice', userName);
    });

    socket.on('chatMessage', (msg) => {
        socket.to(ROOM).emit('chatMessage', msg);
    });

    socket.on('typing', (userName) => {
        socket.to(ROOM).emit('typing', userName);
    });

    socket.on('stopTyping', (userName) => {
        socket.to(ROOM).emit('stopTyping', userName);
    });

    socket.on('disconnect', async () => {
        activeUsers.delete(socket.id);
        await emitActiveUserCount();
    });
});
export default app;
export { server };
