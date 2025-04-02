'use client';

import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserCameraProps {
  setIsListening: (isListening: boolean) => void;
}

export const UserCamera: React.FC<UserCameraProps> = ({ setIsListening }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (stream) {
        stream.getTracks().forEach(track => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
      }
      setIsCameraOn(false);
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: isMicOn 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        
        setStream(newStream);
        setIsCameraOn(true);
        setHasPermission(true);
      } catch (err) {
        console.error('Error accessing camera:', err);
        setHasPermission(false);
      }
    }
  };

  const toggleMic = async () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    setIsListening(newMicState);
    
    if (stream) {
      stream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          track.stop();
        }
      });
    }
    
    if (newMicState && isCameraOn) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        
        setStream(newStream);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-bodoni)" }}>
          Your Camera
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCamera}
            className={`p-2 rounded-full ${
              isCameraOn 
                ? 'bg-gray2/20 hover:bg-gray2/30' 
                : 'bg-gray2/10 hover:bg-gray2/20'
            }`}
          >
            {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMic}
            className={`p-2 rounded-full ${
              isMicOn 
                ? 'bg-gray2/20 hover:bg-gray2/30' 
                : 'bg-gray2/10 hover:bg-gray2/20'
            }`}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
        {isCameraOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray2/10">
            <div className="text-center">
              <CameraOff className="w-12 h-12 mx-auto mb-2 text-gray2/40" />
              <p className="text-sm text-gray2/60">
                {hasPermission === false 
                  ? 'Camera access denied' 
                  : 'Camera is turned off'}
              </p>
              {hasPermission !== false && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCamera}
                  className="mt-4 px-4 py-2 bg-gray2/20 hover:bg-gray2/30 rounded-md text-sm"
                >
                  Turn on camera
                </motion.button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};