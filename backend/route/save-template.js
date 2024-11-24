const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/save-template', (req, res) => {
    const { content, imageSources } = req.body;

    if (!content) {
        return res.status(400).json({ success: false, message: 'No content received' });
    }

    const filePath = './saved_templates/template.html';
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ success: false, message: 'Failed to save changes' });
        }

        res.json({ success: true, message: 'Changes saved successfully!' });
    });
});

module.exports = router;
console.log("saved changess")