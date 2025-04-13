// /server/routes/generate.js
const express = require('express');
const router = express.Router();
const docGenerator = require('../services/docGenerator');

// POST request to generate the DOCX file
router.post('/generate-docx', async (req, res) => {
  try {
    const fileBuffer = await docGenerator.generateDoc(req.body);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=lease-agreement.docx');
    res.send(fileBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Error generating document' });
  }
});

module.exports = router;
