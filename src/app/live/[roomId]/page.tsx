"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import JoinClassModal from "@/components/JoinClassModal";
import LiveRoom from "@/components/LiveRoom";
import ChatBox from "@/components/ChatBox";
import socket from "@/utils/socket";

export default function LiveSessionPage() {
  const { roomId } = useParams();
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");

  const handleJoin = (name: string, selectedRole: string) => {
    setUsername(name);
    setRole(selectedRole);
    setJoined(true);
  };

  const handleLeave = () => {
    if (role === "instructor") {
      socket.emit("end-session", roomId);
    }
    setJoined(false);
    setUsername("");
    setRole("student");
  };

  if (!roomId) return <div className="text-center p-4">Invalid Room</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {!joined && <JoinClassModal onJoin={handleJoin} />}
      {joined && (
        <div className="h-screen flex flex-col">
          <div className="bg-purple-700 text-white py-3 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Live Room: {roomId}</h1>
            <div className="flex gap-3 items-center">
              <span className="text-sm">{username} ({role})</span>
              <button
                onClick={handleLeave}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                {role === "instructor" ? "End Session" : "Leave Session"}
              </button>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 bg-black">
              <LiveRoom room={roomId as string} username={username} role={role} onLeave={handleLeave} />
            </div>
            <div className="w-full md:w-[300px] border-l">
              <ChatBox room={roomId as string} username={username} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
