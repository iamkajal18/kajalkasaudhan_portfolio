// components/LiveRoom.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { connectSocket, disconnectSocket, emitEvent, onEvent, offEvent } from '@/app/api/socket';
import ChatBox from './ChatBox';

const LiveRoom = ({ userId, role, roomId }: { userId: string; role: 'instructor' | 'student'; roomId: string }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    connectSocket();

    // Initialize WebRTC
    const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    peerConnectionRef.current = new RTCPeerConnection(servers);

    // Get media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream;
        mediaStream.getTracks().forEach((track) =>
          peerConnectionRef.current?.addTrack(track, mediaStream)
        );
      })
      .catch((err) => {
        console.error('Media error:', err);
        setError('Failed to access camera or microphone');
      });

    // ICE candidate handling
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        emitEvent('ice-candidate', { candidate: event.candidate, roomId, from: userId });
      }
    };

    // Remote stream handling
    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Handle offer (student receives from instructor)
    onEvent('offer', async ({ offer, from }: { offer: RTCSessionDescriptionInit; from: string }) => {
      if (role === 'student' && peerConnectionRef.current && from !== userId) {
        try {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          emitEvent('answer', { answer, roomId, from: userId });
        } catch (err) {
          console.error('Offer error:', err);
          setError('Failed to process offer');
        }
      }
    });

    // Handle answer (instructor receives from student)
    onEvent('answer', async ({ answer, from }: { answer: RTCSessionDescriptionInit; from: string }) => {
      if (role === 'instructor' && peerConnectionRef.current && from !== userId) {
        try {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (err) {
          console.error('Answer error:', err);
          setError('Failed to process answer');
        }
      }
    });

    // Handle ICE candidate
    onEvent('ice-candidate', async ({ candidate, from }: { candidate: RTCIceCandidateInit; from: string }) => {
      if (peerConnectionRef.current && from !== userId) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('ICE candidate error:', err);
          setError('Failed to add ICE candidate');
        }
      }
    });

    // Handle user joining
    onEvent('user-joined', ({ userId: joinedUserId, role: joinedRole }: { userId: string; role: string }) => {
      if (role === 'instructor' && joinedRole === 'student' && peerConnectionRef.current) {
        peerConnectionRef.current.createOffer()
          .then((offer) => {
            peerConnectionRef.current?.setLocalDescription(offer);
            emitEvent('offer', { offer, roomId, from: userId });
          })
          .catch((err) => {
            console.error('Offer creation error:', err);
            setError('Failed to create offer');
          });
      }
    });

    return () => {
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
      offEvent('offer');
      offEvent('answer');
      offEvent('ice-candidate');
      offEvent('user-joined');
      disconnectSocket();
    };
  }, [role, roomId, userId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">{role === 'instructor' ? 'Instructor' : 'Student'} View</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex gap-4">
        <div>
          <h3 className="text-lg">Your Camera</h3>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-96 border" />
        </div>
        {role === 'student' && (
          <div>
            <h3 className="text-lg">Instructor's Camera</h3>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-96 border" />
          </div>
        )}
      </div>
      {role === 'student' && <ChatBox roomId={roomId} userId={userId} />}
    </div>
  );
};

export default LiveRoom;