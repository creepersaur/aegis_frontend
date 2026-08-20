import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SensorData {
    Acc_X: number;
    Acc_Y: number;
    Acc_Z: number;
    Gyro_X: number;
    Gyro_Y: number;
    Gyro_Z: number;
    Speed?: number;
    Acceleration?: number;
}

export function useSensorWebSocket() {
    const [isTracking, setIsTracking] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [lastAnomaly, setLastAnomaly] = useState<any>(null);

    const socketRef = useRef<Socket | null>(null);
    const bufferRef = useRef<SensorData[]>([]);
    const intervalRef = useRef<number | null>(null);
    const startTimestampRef = useRef<string | null>(null);

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
            withCredentials: true
        });

        socketRef.current.on('connect', () => {
            console.log('Sensor WebSocket connected:', socketRef.current?.id);
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Sensor WebSocket disconnected');
            setIsConnected(false);
            stopTracking();
        });

        socketRef.current.on('anomaly_detected', (data) => {
            console.warn('ANOMALY DETECTED:', data);
            setLastAnomaly(data);
            alert(`⚠️ SAFETY ANOMALY DETECTED!\nScore: ${(data.anomaly_score * 100).toFixed(1)}%\nAction: ${data.suggested_action}`);
        });

        socketRef.current.on('batch_error', (error) => {
            console.error('Batch Error:', error);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            stopTracking();
        };
    }, []);

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
        const { accelerationIncludingGravity, rotationRate } = event;
        
        const data: SensorData = {
            Acc_X: accelerationIncludingGravity?.x || 0,
            Acc_Y: accelerationIncludingGravity?.y || 0,
            Acc_Z: accelerationIncludingGravity?.z || 0,
            Gyro_X: rotationRate?.alpha || 0,
            Gyro_Y: rotationRate?.beta || 0,
            Gyro_Z: rotationRate?.gamma || 0,
            Speed: 0,
            Acceleration: 0
        };

        bufferRef.current.push(data);
    };

    const flushBatch = () => {
        if (!socketRef.current || !socketRef.current.connected) return;
        
        const timestamp_end = new Date().toISOString();
        
        if (bufferRef.current.length > 0) {
            socketRef.current.emit('sensor_batch_stream', {
                samples: bufferRef.current,
                timestamp_start: startTimestampRef.current,
                timestamp_end: timestamp_end
            });
            console.log(`Flushed batch of ${bufferRef.current.length} samples.`);
        }

        bufferRef.current = [];
        startTimestampRef.current = timestamp_end;
    };

    const startTracking = async () => {
        if (isTracking) return;

        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            try {
                const permissionState = await (DeviceMotionEvent as any).requestPermission();
                if (permissionState !== 'granted') {
                    alert('Sensor permission denied. Aegis cannot protect you without sensor access.');
                    return;
                }
            } catch (error) {
                console.error('Error requesting sensor permission:', error);
                return;
            }
        }

        setIsTracking(true);
        bufferRef.current = [];
        startTimestampRef.current = new Date().toISOString();

        window.addEventListener('devicemotion', handleDeviceMotion);
        
        intervalRef.current = window.setInterval(flushBatch, 10000);
    };

    const stopTracking = () => {
        setIsTracking(false);
        window.removeEventListener('devicemotion', handleDeviceMotion);
        
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        flushBatch();
    };

    return {
        isConnected,
        isTracking,
        startTracking,
        stopTracking,
        lastAnomaly
    };
}
