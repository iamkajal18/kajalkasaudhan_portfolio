import { io } from "socket.io-client";
const socket = io(undefined, {
  path: "/api/socket",
});

export default socket;
