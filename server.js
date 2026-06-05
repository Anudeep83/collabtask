const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;

  console.log(
    "Connected. Online:",
    onlineUsers
  );

  socket.emit(
    "online-users",
    onlineUsers
  );

  io.emit(
    "online-users",
    onlineUsers
  );

  socket.on("task-updated", (task) => {
    console.log(
      "TASK UPDATED EVENT:",
      task
    );

    socket.broadcast.emit(
      "task-updated",
      task
    );
  });

  socket.on("activity-updated", () => {
    console.log(
      "ACTIVITY UPDATED EVENT"
    );
    io.emit(
      "activity-updated"
    );
  });

  socket.on("disconnect", () => {
      onlineUsers--;

      console.log(
        "Disconnected. Online:",
        onlineUsers
      );

      io.emit(
        "online-users",
        onlineUsers
      );
    });
  });


httpServer.listen(3001, () => {
  console.log(
    "Socket running on 3001"
  );
});