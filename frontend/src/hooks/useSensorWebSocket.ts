import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSensorWebSocket() {
    const [isTracking, setIsTracking] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [lastAnomaly, setLastAnomaly] = useState<any>(null);

    const socketRef = useRef<Socket | null>(null);
    const bufferRef = useRef<number[][]>([]);
    const intervalRef = useRef<number | null>(null);
    const geoWatcherRef = useRef<number | null>(null);
    const locationRef = useRef<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });



    const handleDeviceMotion = (event: DeviceMotionEvent) => {
        const accX = Number(event.accelerationIncludingGravity?.x) || 0;
        const accY = Number(event.accelerationIncludingGravity?.y) || 0;
        const accZ = Number(event.accelerationIncludingGravity?.z) || 0;
        const gyroX = Number(event.rotationRate?.alpha) || 0;
        const gyroY = Number(event.rotationRate?.beta) || 0;
        const gyroZ = Number(event.rotationRate?.gamma) || 0;
        
        // ML model expects 9 features: [accX, accY, accZ, gyroX, gyroY, gyroZ, speed, accel, angularSpeed]
        const speed = 0; // Placeholder, could be derived from GPS or integration
        const accel = 0; // Placeholder
        const angularSpeed = Math.sqrt(gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ);

        const sample = [accX, accY, accZ, gyroX, gyroY, gyroZ, speed, accel, angularSpeed];
        bufferRef.current.push(sample);
    };

    const flushBatch = () => {
        if (!socketRef.current || !socketRef.current.connected) return;
        
        if (bufferRef.current.length > 0) {
            socketRef.current.emit('sensor_batch_stream', {
                motionData: bufferRef.current,
                latitude: locationRef.current.latitude,
                longitude: locationRef.current.longitude
            });
            console.log(`Flushed batch of ${bufferRef.current.length} samples at [${locationRef.current.latitude}, ${locationRef.current.longitude}]`);
        }

        bufferRef.current = [];
    };

    const startTracking = async () => {
        if (isTracking) return;

        // 2. Start Geolocation Tracking
        if ("geolocation" in navigator) {
            geoWatcherRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    locationRef.current = {
                        latitude: Number(position.coords.latitude) || 0,
                        longitude: Number(position.coords.longitude) || 0
                    };
                },
                (error) => {
                    console.error("Error watching geolocation:", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }

        setIsTracking(true);
        bufferRef.current = [];

        window.addEventListener('devicemotion', handleDeviceMotion);
        
        // 10-second batches matching typical ML windowing
        intervalRef.current = window.setInterval(flushBatch, 10000);
    };

    const stopTracking = () => {
        setIsTracking(false);
        window.removeEventListener('devicemotion', handleDeviceMotion);
        
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (geoWatcherRef.current !== null) {
            navigator.geolocation.clearWatch(geoWatcherRef.current);
            geoWatcherRef.current = null;
        }

        flushBatch();
    };

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
            withCredentials: true
        });

        socketRef.current.on('connect', () => {
            console.log('Sensor WebSocket connected:', socketRef.current?.id);
            setIsConnected(true);
            startTracking();
        });

        socketRef.current.on('disconnect', () => {
            console.log('Sensor WebSocket disconnected');
            setIsConnected(false);
            stopTracking();
        });

        socketRef.current.on('crash_alert', (data) => {
            console.error('CRASH ALERT DETECTED:', data);
            setLastAnomaly(data);
            alert(`🚨 CRASH ALERT 🚨\n${data.message}`);
        });

        socketRef.current.on('sensor_alert', (data) => {
            console.warn('SENSOR ANOMALY DETECTED:', data);
            setLastAnomaly(data);
        });

        socketRef.current.on('sensor_normal', (data) => {
            // Optional: you can log or update UI for normal status
            console.log('Sensor Status:', data.message);
        });

        socketRef.current.on('payload_error', (error) => {
            console.error('Payload Error:', error);
        });

        socketRef.current.on('error', (error) => {
            console.error('WebSocket Error:', error);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            stopTracking();
        };
    }, []);

    return {
        isConnected,
        isTracking,
        startTracking,
        stopTracking,
        lastAnomaly
    };
}
