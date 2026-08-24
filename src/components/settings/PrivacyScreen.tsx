import "./settings.css"; // Reuse settings styling or profile styling

export default function PrivacyScreen() {
    return (
        <div className="profile-container">
            <span className="profile-title">Privacy & Data</span>

            <div className="profile-scroll-area" style={{ textAlign: "left", padding: "10px 5px" }}>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px", fontStyle: "italic" }}>
                    Your Privacy Matters
                </p>

                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is designed to use sensor and device data primarily for emergency detection, verification and response.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Data We May Collect</h3>
                
                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>1. Personal Information</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Information such as your name, phone number and other details you provide to create and maintain your <strong style={{ color: "#ff6a00" }}>AEGIS</strong> profile.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>2. Location Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Your location may be used to determine where an incident occurs and may be shared with authorized emergency responders when an emergency response is initiated.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>3. Motion & Sensor Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Accelerometer, gyroscope and other supported sensor data may be analyzed to identify unusual motion and potential accidents.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>4. Audio Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Microphone input may be analyzed to identify acoustic patterns associated with potential incidents.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>5. Camera / Dashcam Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Where supported and enabled, camera or dashcam footage may be used to provide visual evidence surrounding a potential incident.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>6. Vehicle Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    When a supported vehicle or OBD device is connected, relevant vehicle telemetry may be used for incident detection and verification.
                </p>

                <h4 style={{ color: "#e5e7eb", fontSize: "14px", marginBottom: "5px" }}>7. Wearable Data</h4>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                    Connected smartwatches, smart rings and other supported wearable devices may provide additional motion, activity and physiological data for multi-device verification.
                </p>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Digital Black Box</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> uses a rolling data buffer for relevant incident information.
                    <br /><br />
                    Data from the recent period is continuously overwritten as time passes. If an incident is sufficiently verified, relevant information from before and after the event may be preserved as part of the Digital Black Box.
                    <br /><br />
                    This information may include sensor readings, location data, audio, video and supported vehicle or wearable data.
                </p>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>How Your Data Is Used</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    Your data may be used to:
                </p>
                <ul style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px", paddingLeft: "20px" }}>
                    <li>Detect and verify potential emergencies</li>
                    <li>Reduce false emergency alerts</li>
                    <li>Determine incident location</li>
                    <li>Provide information to emergency responders</li>
                    <li>Notify configured emergency contacts</li>
                    <li>Reconstruct and review incidents</li>
                    <li>Improve the reliability of <strong style={{ color: "#ff6a00" }}>AEGIS</strong> detection systems</li>
                </ul>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Data Sharing</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> does not share your personal or incident data unnecessarily.
                    <br /><br />
                    During a verified emergency, relevant information may be shared with:
                </p>
                <ul style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px", paddingLeft: "20px" }}>
                    <li>Authorized emergency services</li>
                    <li>Your configured emergency contacts</li>
                    <li>Authorized <strong style={{ color: "#ff6a00" }}>AEGIS</strong> systems required to process the emergency</li>
                </ul>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                    Only information relevant to the emergency response should be transmitted where technically possible.
                </p>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Your Controls</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                    You can manage available permissions and connected devices through your device and <strong style={{ color: "#ff6a00" }}>AEGIS</strong> settings.
                    <br /><br />
                    You may manage:
                </p>
                <ul style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px", paddingLeft: "20px" }}>
                    <li>Location access</li>
                    <li>Microphone access</li>
                    <li>Camera access</li>
                    <li>Wearable devices</li>
                    <li>Vehicle connections</li>
                    <li>Emergency contacts</li>
                    <li>Saved incident data</li>
                </ul>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px", fontStyle: "italic" }}>
                    Disabling certain permissions may affect <strong style={{ color: "#ff6a00" }}>AEGIS</strong>'s ability to detect or respond to emergencies.
                </p>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Data Security</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is designed to protect stored and transmitted information using appropriate security measures.
                    <br /><br />
                    However, no digital system or method of transmission can guarantee complete security.
                </p>

                <hr style={{ borderColor: "#374151", marginBottom: "20px" }} />

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "15px" }}>Your Data & AEGIS</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is built around the principle of collecting relevant information for safety rather than continuously retaining everything indefinitely.
                    <br /><br />
                    Where technically possible, temporary sensor data is discarded when it is no longer required for the detection process.
                </p>

                <div style={{ textAlign: "center", color: "#6b7280", fontSize: "12px", marginTop: "40px", marginBottom: "20px" }}>
                    <p>Last updated: August 2026</p>
                </div>
            </div>
        </div>
    );
}
