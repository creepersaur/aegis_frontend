import { useEffect, useState } from 'react';
import './devices.css';

interface DeviceSession {
    id: string;
    device_name: string;
    ip_address: string;
    last_active: string;
    isCurrent: boolean;
}

export default function DevicesScreen() {
    const [devices, setDevices] = useState<DeviceSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = () => {
        fetch('http://localhost:3000/devices', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // needed to send the cookie
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch devices');
            return res.json();
        })
        .then(data => {
            setDevices(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Could not load active sessions.');
            setLoading(false);
        });
    };

    const handleRevoke = (id: string) => {
        if (!confirm('Are you sure you want to log out of this device?')) return;
        
        fetch(`http://localhost:3000/devices/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to revoke device');
            setDevices(prev => prev.filter(d => d.id !== id));
        })
        .catch(err => {
            console.error(err);
            alert('Error revoking session. Please try again.');
        });
    };

    return (
        <div className="devices-container">
            <span className="devices-title">Active Devices</span>

            <div className="devices-scroll-area">
                {loading ? (
                    <div className="devices-loader"><div className="pulsing-dot"></div></div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="devices-list">
                        {devices.map(d => (
                            <div key={d.id} className={`device-card ${d.isCurrent ? 'current-device' : ''}`}>
                                <div className="d-icon">
                                    {d.device_name.toLowerCase().includes('mobile') || d.device_name.toLowerCase().includes('iphone') || d.device_name.toLowerCase().includes('android') ? '📱' : '💻'}
                                </div>
                                <div className="d-info">
                                    <span className="d-name">{d.device_name} {d.isCurrent && <span className="badge-current">Current</span>}</span>
                                    <span className="d-meta">IP: {d.ip_address}</span>
                                    <span className="d-meta">Last Active: {new Date(d.last_active).toLocaleString()}</span>
                                </div>
                                {!d.isCurrent && (
                                    <button className="btn-revoke" onClick={() => handleRevoke(d.id)}>Log Out</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
