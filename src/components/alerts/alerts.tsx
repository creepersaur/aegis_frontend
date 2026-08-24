import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Activity, ChevronRight, Share2, HelpCircle } from "lucide-react";
import "./alerts.css";

// ------------------------------------------------------------------
// MOCK DATA & TYPES
// ------------------------------------------------------------------

export type AlertType = 'escalated' | 'cancelled' | 'resolved' | 'event';

export interface Alert {
    id: string;
    type: AlertType;
    title: string;
    description: string;
    timestamp: string;
    displayDate: string;
    color: string;
    icon: React.FC<any>;
    amountText?: string;
    details: {
        location: string;
        response_time: string;
        trigger: string;
        confidence: string;
        txnId: string;
    };
}

const mockAlerts: Alert[] = [
    {
        id: "a1b2",
        type: 'escalated',
        title: "Emergency Escalated",
        description: "AEGIS completed verification and initiated response",
        timestamp: "8:22PM, 23 Aug",
        displayDate: "23 Aug 2026 at 08:22 PM",
        color: "#ef4444", // Red
        icon: ShieldAlert,
        amountText: "Critical",
        details: {
            location: "Highway 9, Mile 42",
            response_time: "Responded in 3s",
            trigger: "High G-Force Impact (4.2G)",
            confidence: "99.8%",
            txnId: "01a02f1b-dcdd-793c-872c-c68f18ae0def"
        }
    },
    {
        id: "c3d4",
        type: 'cancelled',
        title: "Alert Cancelled",
        description: "AEGIS detected a potential emergency but user cancelled",
        timestamp: "10:52AM, 18 Aug",
        displayDate: "18 Aug 2026 at 10:52 AM",
        color: "#eab308", // Yellow
        icon: AlertTriangle,
        amountText: "Cancelled",
        details: {
            location: "Downtown Market St.",
            response_time: "User cancelled in 4s",
            trigger: "Sudden deceleration",
            confidence: "82.1%",
            txnId: "77b81f1b-aaaa-111c-992c-b18f18ee0001"
        }
    },
    {
        id: "e5f6",
        type: 'resolved',
        title: "Anomaly Resolved",
        description: "AEGIS detected an anomaly but verification determined no emergency",
        timestamp: "10:14AM, 16 Aug",
        displayDate: "16 Aug 2026 at 10:14 AM",
        color: "#22c55e", // Green
        icon: CheckCircle2,
        amountText: "Resolved",
        details: {
            location: "Suburban Route 4",
            response_time: "Auto-resolved in 2s",
            trigger: "Phone Drop Detected",
            confidence: "45.0%",
            txnId: "22cc4f1b-bbbb-222c-882c-a28f18ff0002"
        }
    },
    {
        id: "g7h8",
        type: 'event',
        title: "Detection Event",
        description: "An event was detected but didn't progress far enough to become an alert",
        timestamp: "10:13PM, 14 Aug",
        displayDate: "14 Aug 2026 at 10:13 PM",
        color: "#9ca3af", // Gray/White
        icon: Activity,
        amountText: "Logged",
        details: {
            location: "Parking Lot B",
            response_time: "Logged in 1s",
            trigger: "Minor vibration",
            confidence: "12.5%",
            txnId: "99dd5f1b-cccc-333c-772c-c38f18gg0003"
        }
    }
];


// ------------------------------------------------------------------
// COMPONENTS
// ------------------------------------------------------------------

export default function Alerts() {
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    if (selectedAlert) {
        return <AlertDetail alert={selectedAlert} onBack={() => setSelectedAlert(null)} />;
    }

    return (
        <div className="alerts-container">
            <div className="alerts-header">
                <h2>History</h2>
            </div>

            <div className="alerts-summary-box">
                <p><span>ℹ</span> 4 detection events logged this month, System Active</p>
            </div>

            <div className="alerts-month-header">
                <h3>August <span>2026</span></h3>
            </div>

            <div className="alerts-list">
                {mockAlerts.map(alert => (
                    <div className="alert-row" key={alert.id} onClick={() => setSelectedAlert(alert)}>
                        <div className="alert-icon-wrapper" style={{ backgroundColor: `${alert.color}20` }}>
                            <alert.icon color={alert.color} size={24} />
                        </div>
                        <div className="alert-info">
                            <h4>{alert.title}</h4>
                            <p>{alert.timestamp}</p>
                        </div>
                        <div className="alert-value" style={{ color: alert.color }}>
                            {alert.amountText}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AlertDetail({ alert, onBack }: { alert: Alert, onBack: () => void }) {
    return (
        <div className="alert-detail-container">
            <div className="detail-top-bar">
                <button className="icon-btn" onClick={onBack}><ArrowLeft size={24} /></button>
                <div className="top-right-icons">
                    <button className="icon-btn"><HelpCircle size={20} /></button>
                    <button className="icon-btn"><Share2 size={20} /></button>
                </div>
            </div>

            <div className="detail-hero">
                <h1 style={{ color: alert.color }}>{alert.title}</h1>
                <p>Location: {alert.details.location}</p>
                <p className="detail-description">{alert.description}</p>
                
                <div className="status-badge" style={{ backgroundColor: `${alert.color}15`, color: alert.color, border: `1px solid ${alert.color}40` }}>
                    <alert.icon size={16} style={{ marginRight: '6px' }} />
                    {alert.details.response_time}
                </div>
            </div>

            <div className="detail-timestamp">
                <p>{alert.displayDate}</p>
                <p className="txn-id">Event ID: {alert.details.txnId} <span>📋</span></p>
            </div>

            <div className="view-details-btn">
                <span>View Full Telemetry Details</span> <ChevronRight size={16} />
            </div>

            <div className="detail-cards-container">
                <div className="detail-card">
                    <div className="card-badge" style={{ backgroundColor: '#fff', color: '#000' }}>
                        TRIGGER
                    </div>
                    <p className="card-title">{alert.details.trigger}</p>
                    <div className="card-footer" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.8), transparent)' }}></div>
                </div>

                <div className="detail-card" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
                    <div className="card-badge" style={{ backgroundColor: '#38bdf8', color: '#fff' }}>
                        CONFIDENCE
                    </div>
                    <p className="card-title">{alert.details.confidence} ML Match</p>
                    <p className="card-subtitle">+ Multi-sensor verified</p>
                </div>
            </div>
        </div>
    );
}
