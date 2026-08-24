const User = require('../models/User');
const MedicalProfile = require('../models/MedicalProfile');
const EmergencyContact = require('../models/EmergencyContact');
const Session = require('../models/Session');
const sequelize = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UAParser = require('ua-parser-js');
const crypto = require('crypto');
require('dotenv').config();
const saltRounds = 12;

module.exports = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { 
            fullName, email, password,
            age, gender, height, weight,
            allergies, previous_medical_history, chronic_illnesses,
            severe_medical_conditions, emergency_contacts, primary_doctor_contact
        } = req.body;

        if (!fullName) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Please enter a valid name.' });
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !regex.test(email)) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Please enter a valid email.' });
        }
        
        if (await User.findOne({ where: {email: email}, transaction: t })) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Email address has already been taken.' });
        }

        if (!password) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Please enter a valid password.' });
        }
        if (password.length < 8) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Password should at least be of 8 characters.' });
        }

        if (gender && !['Male', 'Female', 'Others'].includes(gender)) {
            await t.rollback();
            return res.status(400).json({ 'message': 'Gender must be Male, Female, or Others.' });
        }

        const passwordHashed = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            fullName: fullName,
            email: email,
            password: passwordHashed,
            age: age,
            gender: gender,
            height: height,
            weight: weight
        }, { transaction: t });

        await MedicalProfile.create({
            user_id: newUser.id,
            allergies: Array.isArray(allergies) ? JSON.stringify(allergies) : allergies,
            previous_medical_history: previous_medical_history,
            chronic_illnesses: chronic_illnesses,
            severe_medical_conditions: severe_medical_conditions,
            primary_doctor_contact: primary_doctor_contact
        }, { transaction: t });

        if (emergency_contacts && Array.isArray(emergency_contacts)) {
            for (const contact of emergency_contacts) {
                if (contact.name && contact.phone && contact.relation) {
                    await EmergencyContact.create({
                        user_id: newUser.id,
                        name: contact.name,
                        phone: String(contact.phone),
                        relation: contact.relation
                    }, { transaction: t });
                }
            }
        }

        const sessionId = crypto.randomUUID();

        const payload = {
            'id': newUser.id,
            'fullName': newUser.fullName,
            'email': newUser.email,
            'createdAt': newUser.createdAt,
            'sessionId': sessionId
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 'expiresIn': '7d' });

        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();
        const deviceName = `${result.browser.name || 'Unknown Browser'} on ${result.os.name || 'Unknown OS'}`;

        let ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket?.remoteAddress || 'Unknown IP';
        if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') ipAddress = '127.0.0.1 (Localhost)';

        await Session.create({
            id: sessionId,
            user_id: newUser.id,
            device_name: deviceName,
            ip_address: ipAddress
        }, { transaction: t });

        await t.commit();
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ 'message': 'You have successfully registered.' });
    } catch (err) {
        if (!t.finished) {
            await t.rollback();
        }
        console.error('Error during registration:', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.', error: err.message });
    }
};