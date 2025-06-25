'use client';

import React, { useState, useEffect } from 'react';
import JoinClassModal from '@/components/JoinClassModal';
import LiveRoom from '@/components/LiveRoom';

export default function LivePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Session</h1>
      <JoinClassModal />
    </div>
  );
}