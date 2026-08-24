export const requestSensorPermissions = async (): Promise<boolean> => {
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
            const permissionState = await (DeviceMotionEvent as any).requestPermission();
            if (permissionState === 'granted') {
                return true;
            } else {
                alert('Sensor permission denied. Aegis cannot protect you without sensor access.');
                return false;
            }
        } catch (error) {
            console.error('Error requesting sensor permission:', error);
            // Ignore error; typically it's because it wasn't triggered by a user gesture.
            return false;
        }
    }
    
    // Non-iOS devices (Android/Desktop) don't require explicit requestPermission
    return true;
};
