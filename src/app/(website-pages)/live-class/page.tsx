"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
// Update the path below if your JoinClassModal is located elsewhere
// Update the path below if your JoinClassModal is located elsewhere
import JoinClassModal from "@/components/JoinClassModal";

const socket = io("http://localhost:3000");

const LiveClassPage = () => {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  type Message = { user: string; text: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (joined) {
      socket.emit("join-room", { username, role });

      socket.on("user-joined", (data) => {
        setMessages((prev) => [
          ...prev,
          { user: "System", text: `${data.username} joined as ${data.role}` },
        ]);
      });

      socket.on("receive-message", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [joined]);

  useEffect(() => {
    // Access user's camera
    if (joined && role === "instructor" && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied or failed", err);
        });
    }
  }, [joined, role]);

  const handleJoin = (name: string, selectedRole: string) => {
    setUsername(name);
    setRole(selectedRole);
    setJoined(true);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const msg = { user: username, text: message };
      socket.emit("send-message", msg);
      setMessages((prev) => [...prev, msg]);
      setMessage("");
    }
  };
const handleEndSession = () => {
  if (videoRef.current?.srcObject) {
    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop()); // 🛑 Stop camera
  }

  socket.emit("leave-room", { username });

  setJoined(false);
  setUsername("");
  setRole("student");
  setMessages([]);
  setMessage("");
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {!joined && <JoinClassModal onJoin={handleJoin} />}

      {joined && (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-purple-700 text-white py-3 px-6 flex justify-between items-center">
  <h1 className="text-xl font-semibold">Live Class</h1>
  <div className="flex gap-3 items-center">
    <span className="text-sm">{username} ({role})</span>
    {role === "instructor" && (
      <button
        onClick={handleEndSession}
        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
      >
        End Session
      </button>
    )}
  </div>
</div>


          {/* Body */}
          <div className="flex flex-1">
            <div className="w-1/4 bg-white border-r p-4 hidden md:block">
              <h2 className="text-lg font-semibold mb-2">Participants</h2>
              <ul>
                <li className="text-gray-700">You ({role})</li>
              </ul>
            </div>

            <div className="flex-1 flex flex-col md:flex-row">
              {/* Video Area */}
              <div className="flex-1 bg-black text-white flex items-center justify-center p-4">
                {role === "instructor" ? (
                  <video ref={videoRef} autoPlay muted className="rounded-lg w-full max-w-3xl" />
                ) : (
                  <p className="text-center text-lg">🎥 Waiting for instructor's stream...</p>
                )}
              </div>

              {/* Chat */}
              <div className="w-full md:w-[300px] bg-white border-l p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-2">Chat</h2>
                <div className="flex-1 overflow-y-auto h-64 bg-gray-50 border rounded p-2 mb-2">
                  {messages.map((msg, index) => (
                    <div key={index} className="text-sm mb-1">
                      <strong>{msg.user}:</strong> {msg.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full border p-2 rounded"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 text-white px-3 rounded"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassPage;
