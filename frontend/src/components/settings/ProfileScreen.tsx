import { useEffect, useState } from "react";
import "./profile.css";

export default function ProfileScreen() {
	const [profileData, setProfileData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
				const response = await fetch(`${backendUrl}/profile`, {
					credentials: 'include'
				});

				if (!response.ok) {
					throw new Error('Failed to fetch profile data');
				}

				const data = await response.json();
				setProfileData(data);
			} catch (err) {
				console.error(err);
				setError("Could not load profile. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, []);



	if (isLoading) {
		return (
			<>
				<span className="profile-title">
					Profile
				</span>
				<div className="profile-loader">
					<div className="pulsing-dot"></div>
				</div>
			</>
		);
	}

	if (error || !profileData) {
		return (
			<>
				<span className="profile-title">
					Profile
				</span>
				<div className="error-message">{error || "No data found."}</div>
			</>
		);
	}

	const med = profileData.MedicalProfile || {};
	
	let emergencyContacts = profileData.EmergencyContacts || [];

	let primaryDoctor = null;
	try {
		primaryDoctor = typeof med.primary_doctor_contact === 'string'
			? JSON.parse(med.primary_doctor_contact)
			: (med.primary_doctor_contact || {});
	} catch(e) {}

	return (
		<>
			<span className="profile-title">
				Profile
			</span>

			<div className="profile-cards">
				<div className="profile-card">
					<h3>Personal Information</h3>
					<div className="profile-field">
						<span className="profile-label">Name</span>
						<span className="profile-value">{profileData.fullName || "N/A"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Email</span>
						<span className="profile-value">{profileData.email || "N/A"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Age</span>
						<span className="profile-value">{profileData.age || "N/A"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Gender</span>
						<span className="profile-value">{profileData.gender || "N/A"}</span>
					</div>
				</div>

				<div className="profile-card">
					<h3>Biometrics</h3>
					<div className="profile-field">
						<span className="profile-label">Height</span>
						<span className="profile-value">{profileData.height ? `${profileData.height} cm` : "N/A"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Weight</span>
						<span className="profile-value">{profileData.weight ? `${profileData.weight} kg` : "N/A"}</span>
					</div>
				</div>

				<div className="profile-card">
					<h3>Medical History</h3>
					<div className="profile-field">
						<span className="profile-label">Allergies</span>
						<span className="profile-value">{med.allergies || "None"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Previous Medical History</span>
						<span className="profile-value">{med.previous_medical_history || "None"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Chronic Illnesses</span>
						<span className="profile-value">{med.chronic_illnesses || "None"}</span>
					</div>
					<div className="profile-field">
						<span className="profile-label">Severe Medical Conditions</span>
						<span className="profile-value">{med.severe_medical_conditions || "None"}</span>
					</div>
				</div>

				<div className="profile-card">
					<h3>Emergency Contacts</h3>
					{emergencyContacts.length > 0 ? (
						emergencyContacts.map((contact: any, idx: number) => (
							<div key={idx} style={{ marginBottom: idx === emergencyContacts.length - 1 ? 0 : '15px' }}>
								<div className="profile-field">
									<span className="profile-label">Contact Name</span>
									<span className="profile-value">{contact.name || "N/A"}</span>
								</div>
								<div className="profile-field">
									<span className="profile-label">Relation</span>
									<span className="profile-value">{contact.relation || "N/A"}</span>
								</div>
								<div className="profile-field">
									<span className="profile-label">Phone</span>
									<span className="profile-value">{contact.phone || "N/A"}</span>
								</div>
							</div>
						))
					) : (
						<div className="profile-field">
							<span className="profile-value">No emergency contacts listed.</span>
						</div>
					)}
					
					{primaryDoctor && Object.keys(primaryDoctor).length > 0 && (
						<div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
							<h4 style={{ color: '#888', marginTop: 0, marginBottom: '10px' }}>Primary Doctor</h4>
							<div className="profile-field">
								<span className="profile-label">Name</span>
								<span className="profile-value">{primaryDoctor.name || "N/A"}</span>
							</div>
							<div className="profile-field">
								<span className="profile-label">Clinic</span>
								<span className="profile-value">{primaryDoctor.clinic || "N/A"}</span>
							</div>
							<div className="profile-field">
								<span className="profile-label">Phone</span>
								<span className="profile-value">{primaryDoctor.phone || "N/A"}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
