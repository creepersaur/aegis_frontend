import { useEffect, useState } from 'react';
import './contacts.css';

interface Contact {
    id: number;
    name: string;
    phone: string;
    relation: string;
}

export default function ContactsScreen() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('http://localhost:3000/contacts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch contacts');
            return res.json();
        })
        .then(data => {
            setContacts(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Could not load your personal contacts.');
            setLoading(false);
        });
    };

    const handleAddContact = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to add contact');
            return res.json();
        })
        .then(data => {
            setContacts(prev => [...prev, data]);
            setShowModal(false);
            setNewContact({ name: '', phone: '', relation: '' });
        })
        .catch(err => {
            console.error(err);
            alert('Error adding contact. Please try again.');
        });
    };

    return (
        <div className="contacts-container">
            <span className="contacts-title">Emergency Contacts</span>

            <div className="contacts-scroll-area">
                {/* Section 1: National Services */}
                <h3 className="section-heading">National Emergency Services</h3>
                <div className="national-grid">
                    <a href="tel:112" className="national-card">
                        <span className="n-icon">🚨</span>
                        <div className="n-details">
                            <span className="n-name">All Emergencies</span>
                            <span className="n-number">112</span>
                        </div>
                    </a>
                    <a href="tel:100" className="national-card">
                        <span className="n-icon">🚓</span>
                        <div className="n-details">
                            <span className="n-name">Police</span>
                            <span className="n-number">100</span>
                        </div>
                    </a>
                    <a href="tel:101" className="national-card">
                        <span className="n-icon">🚒</span>
                        <div className="n-details">
                            <span className="n-name">Fire</span>
                            <span className="n-number">101</span>
                        </div>
                    </a>
                    <a href="tel:102" className="national-card">
                        <span className="n-icon">🚑</span>
                        <div className="n-details">
                            <span className="n-name">Ambulance</span>
                            <span className="n-number">102</span>
                        </div>
                    </a>
                    <a href="tel:1091" className="national-card">
                        <span className="n-icon">👩</span>
                        <div className="n-details">
                            <span className="n-name">Women Helpline</span>
                            <span className="n-number">1091</span>
                        </div>
                    </a>
                </div>

                {/* Section 2: Personal Contacts */}
                <div className="section-header-row">
                    <h3 className="section-heading" style={{ margin: 0 }}>Personal Contacts</h3>
                    <button className="add-btn-small" onClick={() => setShowModal(true)}>+</button>
                </div>
                {loading ? (
                    <div className="contacts-loader"><div className="pulsing-dot"></div></div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="personal-list">
                        {contacts.length === 0 ? (
                            <div className="no-contacts">No personal contacts added yet.</div>
                        ) : (
                            contacts.map(c => (
                                <a key={c.id} href={`tel:${c.phone}`} className="personal-card">
                                    <div className="p-details">
                                        <span className="p-name">{c.name}</span>
                                        <span className="p-relation">{c.relation}</span>
                                    </div>
                                    <span className="p-phone">📞 {c.phone}</span>
                                </a>
                            ))
                        )}
                    </div>
                )}
            </div>


            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Add Emergency Contact</h2>
                        <form onSubmit={handleAddContact}>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                required 
                                value={newContact.name}
                                onChange={e => setNewContact({...newContact, name: e.target.value})}
                            />
                            <input 
                                type="text" 
                                placeholder="Relationship" 
                                required 
                                value={newContact.relation}
                                onChange={e => setNewContact({...newContact, relation: e.target.value})}
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone Number" 
                                required 
                                value={newContact.phone}
                                onChange={e => setNewContact({...newContact, phone: e.target.value})}
                            />
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
