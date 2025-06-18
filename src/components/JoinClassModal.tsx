"use client";

import React, { useState } from "react";

const JoinClassModal = ({ onJoin }: { onJoin: (name: string, role: string) => void }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Join Live Class</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button
          onClick={() => onJoin(name, role)}
          className="bg-purple-700 text-white w-full py-2 rounded"
        >
          Join Class
        </button>
      </div>
    </div>
  );
};

export default JoinClassModal;
