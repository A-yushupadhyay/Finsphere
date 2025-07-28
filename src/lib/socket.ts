// 📁 lib/socket.ts (stub for future Socket.IO integration)
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";


export const socket = io("http://localhost:3001"); // to be replaced in production

// Sample toast usage
socket.on("balance:update", (data) => {
  toast.success(data.message || `Balance updated: ₹${data.newBalance}`);
});

