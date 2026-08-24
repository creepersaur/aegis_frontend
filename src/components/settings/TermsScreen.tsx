import "./settings.css"; // Reuse settings styling or profile styling

export default function TermsScreen() {
    return (
        <div className="profile-container">
            <span className="profile-title">Terms & Conditions</span>

            <div className="profile-scroll-area" style={{ textAlign: "left", padding: "10px 5px" }}>
                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>1. About AEGIS</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is an AI-assisted emergency response system designed to detect potential accidents and emergencies using multiple layers of sensor, environmental and contextual data.
                    <br /><br />
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> is intended to provide an additional layer of safety and should not be considered a replacement for emergency services, medical assistance or responsible behaviour.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>2. Emergency Detection</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> uses multiple verification layers to identify potential emergencies. These may include motion sensors, audio, GPS, connected vehicle data and supported wearable devices.
                    <br /><br />
                    No automated detection system can guarantee that every emergency will be detected or correctly identified. <strong style={{ color: "#ff6a00" }}>AEGIS</strong> may occasionally detect a harmless event as a potential emergency or fail to detect an actual emergency.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>3. Emergency Response</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    When an incident meets <strong style={{ color: "#ff6a00" }}>AEGIS</strong>'s verification criteria, the system may initiate its emergency response procedure.
                    <br /><br />
                    A short cancellation period may be provided to allow the user to stop an accidental alert.
                    <br /><br />
                    Emergency response may depend on device functionality, available permissions, network connectivity, GPS availability and integration with supported emergency services.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>4. Sensor & Device Access</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> may require access to device sensors, location, microphone, camera and connected wearable or vehicle devices to provide its safety features.
                    <br /><br />
                    Disabling required permissions, disconnecting a device or restricting background operation may reduce the accuracy or availability of <strong style={{ color: "#ff6a00" }}>AEGIS</strong> detection.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>5. Digital Black Box</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> may maintain a temporary rolling record of relevant sensor and incident data.
                    <br /><br />
                    Older data is continuously discarded as new data is collected. When an incident is sufficiently verified, relevant data surrounding the event may be preserved for incident analysis, emergency response and incident reconstruction.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>6. Emergency Contacts</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    Emergency contacts may be notified when an emergency response is initiated, depending on the user's configuration.
                    <br /><br />
                    Emergency contacts are not a replacement for emergency services and <strong style={{ color: "#ff6a00" }}>AEGIS</strong> does not guarantee that a contact will receive, acknowledge or respond to an alert.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>7. Service Availability</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> may be affected by factors including low battery, device damage, sensor limitations, inaccurate GPS data, loss of network connectivity, device compatibility and restrictions imposed by the operating system.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>8. User Responsibility</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    Users are responsible for providing accurate personal information, emergency contact information and required permissions.
                    <br /><br />
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> should not be intentionally triggered for testing or non-emergency purposes when doing so could unnecessarily involve emergency services.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>9. Updates</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    <strong style={{ color: "#ff6a00" }}>AEGIS</strong> may update its detection models, algorithms, supported devices and features as the system develops.
                    <br /><br />
                    Continued use of <strong style={{ color: "#ff6a00" }}>AEGIS</strong> after an update constitutes acceptance of the updated terms.
                </p>

                <h3 style={{ color: "#ff6a00", fontSize: "16px", marginBottom: "5px" }}>10. Acceptance</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    By using <strong style={{ color: "#ff6a00" }}>AEGIS</strong>, you acknowledge that automated emergency detection has limitations and agree to these Terms & Conditions.
                </p>

                <div style={{ textAlign: "center", color: "#6b7280", fontSize: "12px", marginTop: "40px", marginBottom: "20px" }}>
                    <p>Last updated: August 2026</p>
                </div>
            </div>
        </div>
    );
}
