import React, { useState } from "react";
import type { Screen } from "../../App";
import { useAuth } from "../../context/AuthContext";
import { requestSensorPermissions } from "../../utils/requestSensorPermissions";
import "./register.css";

export default function RegisterScreen({ navigate }: { navigate: (new_screen: Screen) => void }) {
    const { checkAuth } = useAuth();
    const [step, setStep] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        age: "",
        gender: "Male",
        height: "",
        weight: "",
        allergies: "",
        previous_medical_history: "",
        chronic_illnesses: "",
        severe_medical_conditions: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelation: "",
        primaryDoctorName: "",
        primaryDoctorClinic: "",
        primaryDoctorPhone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        setError(null);
        setStep(s => Math.min(s + 1, 4));
    };

    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            age: parseInt(formData.age),
            gender: formData.gender,
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            allergies: formData.allergies,
            previous_medical_history: formData.previous_medical_history,
            chronic_illnesses: formData.chronic_illnesses,
            severe_medical_conditions: formData.severe_medical_conditions,
            emergency_contacts: [
                {
                    name: formData.emergencyContactName,
                    phone: formData.emergencyContactPhone,
                    relation: formData.emergencyContactRelation
                }
            ],
            primary_doctor_contact: {
                name: formData.primaryDoctorName,
                clinic: formData.primaryDoctorClinic,
                phone: formData.primaryDoctorPhone
            }
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                setIsLoading(false);
                return;
            }

            localStorage.setItem('isReturningUser', 'true');
            // Verify auth state with backend now that cookie is set
            await checkAuth();
            
            // Request sensor permission gesture requirement before navigating
            await requestSensorPermissions();
            navigate("home");
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="register-screen">
            <h2 className="register-title">Register for Aegis</h2>
            <div className="progress-bar">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`} />
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`} />
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`} />
                <div className={`progress-step ${step >= 4 ? 'active' : ''}`} />
            </div>

            {error && <div className="error-text">{error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
                {step === 1 && (
                    <div className="form-step">
                        <h3>Step 1: Account Credentials</h3>
                        <label>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <h3>Step 2: Biometrics</h3>
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                        
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        <div className="row-inputs">
                            <div>
                                <label>Height (cm)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} required step="0.1" />
                            </div>
                            <div>
                                <label>Weight (kg)</label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required step="0.1" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step">
                        <h3>Step 3: Medical History</h3>
                        <label>Allergies</label>
                        <textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Any known allergies..." />
                        
                        <label>Previous Medical History</label>
                        <textarea name="previous_medical_history" value={formData.previous_medical_history} onChange={handleChange} />
                        
                        <label>Chronic Illnesses</label>
                        <textarea name="chronic_illnesses" value={formData.chronic_illnesses} onChange={handleChange} />
                        
                        <label>Severe Medical Conditions</label>
                        <textarea name="severe_medical_conditions" value={formData.severe_medical_conditions} onChange={handleChange} />
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step">
                        <h3>Step 4: Emergency Contacts</h3>
                        <label>Emergency Contact Name</label>
                        <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
                        <div className="row-inputs">
                            <div>
                                <label>Phone</label>
                                <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Relation</label>
                                <input type="text" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleChange} required />
                            </div>
                        </div>

                        <hr />

                        <label>Primary Doctor Name</label>
                        <input type="text" name="primaryDoctorName" value={formData.primaryDoctorName} onChange={handleChange} />
                        <div className="row-inputs">
                            <div>
                                <label>Clinic/Hospital</label>
                                <input type="text" name="primaryDoctorClinic" value={formData.primaryDoctorClinic} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input type="text" name="primaryDoctorPhone" value={formData.primaryDoctorPhone} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {step > 1 && <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>}
                    {step < 4 && <button type="button" className="btn-primary" onClick={nextStep}>Next</button>}
                    {step === 4 && <button type="submit" className="btn-primary" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>}
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <span style={{ color: '#aaa', fontSize: '14px' }}>Already have an account? </span>
                    <span 
                        style={{ color: '#ff5c00', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }} 
                        onClick={() => navigate("login")}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
}
