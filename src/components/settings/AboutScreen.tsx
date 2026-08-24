import "./settings.css"; // Reuse settings styling or profile styling

export default function AboutScreen() {
    return (
        <div className="profile-container">
            <span className="profile-title">About Aegis</span>

            <div className="profile-scroll-area" style={{ textAlign: "left", padding: "10px 5px" }}>
                <p style={{ color: "#e5e7eb", fontSize: "15px", lineHeight: "1.6", marginBottom: "15px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is an AI-assisted emergency response system designed to detect potential accidents through multiple layers of sensor verification.
                </p>

                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Instead of relying on a single sensor, <strong style={{ color: "#ff6a00" }}>AEGIS</strong> analyzes motion, environmental, and contextual data to reduce false alarms. When a potential emergency is verified, <strong style={{ color: "#ff6a00" }}>AEGIS</strong> provides the user with a short window to cancel the alert before initiating an emergency response.
                </p>

                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> also incorporates a <strong style={{ color: "#ffffff" }}>Digital Black Box</strong>, maintaining a rolling record of relevant sensor data before and after an incident to help reconstruct what happened.
                </p>

                <p style={{ color: "#ff6a00", fontSize: "15px", fontWeight: "bold", lineHeight: "1.6", marginTop: "20px", marginBottom: "30px" }}>
                    Our vision: make emergency assistance faster, smarter, and more reliable — whether you're in a vehicle or, eventually, on foot.
                </p>

                <div style={{ textAlign: "center", color: "#6b7280", fontSize: "12px", marginTop: "40px" }}>
                    <p>Version 0.1.0</p>
                    <p style={{ color: "#ffffff" }}>©️ 2026 AEGIS</p>
                </div>
            </div>
        </div>
    );
}
