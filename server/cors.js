import axios from 'axios'

axios.get('/api/public/rmt-details/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await getRMTDataById(id);

        const formatted = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            gender: data.gender || 'N/A',
            registrationDate: data.initialRegistrationDate || null,
            registrationClass: data.registrationCategory || '',
            registrationStatus: data.registrationHistory?.[0]?.registrationStatus || '',
            electoralZone: data.electoralZone || '',
            authorizedToPractice: data.authorizedToPractice || false,
            acupunctureAuthorized: data.acupunctureAuthorized || false,
            publicRegisterAlert: data.publicRegisterAlert || '',

            nameHistory: (data.nameHistory || []).map(name => ({
                firstName: name.firstName || '',
                middleName: name.middleName || '',
                lastName: name.lastName || ''
            })),

            languagesOfCare: data.languagesOfCare || [],

            education: (data.education || []).map(edu => ({
                institution: edu.institution || edu.school || edu.name || '',
                completionDate: edu.completionDate || edu.graduationDate || null,
                level: edu.level || edu.degree || edu.qualification || ''
            })),

            registrationHistory: (data.registrationHistory || []).map(entry => ({
                class: entry.classOfRegistration || entry.registrationClass || '',
                status: entry.registrationStatus || '',
                effectiveDate: entry.effectiveDate || entry.date || null,
                notes: entry.notes || entry.comments || ''
            })),

            placesOfPractice: (data.placesOfPractice || []).map(loc => ({
                practiceLocation: loc.employerName || loc.practiceName || '',
                address1: loc.businessAddress || loc.address || loc.streetAddress || '',
                city: loc.city || loc.businessCity || '',
                province: loc.province || loc.businessState || 'Ontario',
                postalCode: loc.businessZipCode || '',
                phone: loc.phone || '',
                website: loc.website || loc.websiteURL || '',
                isPrimary: loc.primary || false
            }))
        };

        res.json(formatted);
    } catch (error) {
        console.error('Error fetching RMT details:', error);
        res.status(500).json({ error: 'Internal server error' });

        console.log('Raw data from DB:', JSON.stringify(data, null, 2));
        res.json({
            receivedData: data,
            formattedData: formatted
        });
    }
});

