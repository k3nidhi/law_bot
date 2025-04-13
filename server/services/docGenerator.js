// /server/services/docGenerator.js
const { Document, Packer, Paragraph, TextRun } = require('docx');

const generateDoc = (formData) => {
  const { 
    lessorName, 
    lessorAddress, 
    lesseeName, 
    lesseeAddress, 
    propertyAddress, 
    leaseYears, 
    startDate, 
    monthlyRent, 
    interestRate, 
    municipalTax 
  } = formData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Deed of Lease Agreement"),
              new TextRun({
                text: `\n\nThis Deed of Lease is made between ${lessorName} of ${lessorAddress} and ${lesseeName} of ${lesseeAddress}.`,
                bold: true,
              }),
            ],
          }),
          new Paragraph(`The Lessor hereby leases the property at ${propertyAddress} to the Lessee for a term of ${leaseYears} years, commencing from ${startDate}, for a monthly ground rent of Rs. ${monthlyRent}.`),
          new Paragraph(`If the rent is unpaid, the Lessee shall pay interest at ${interestRate}% per annum. The Lessee shall also pay municipal taxes of Rs. ${municipalTax} annually.`),
          new Paragraph("The Lessee may construct, alter, or renovate structures on the property as permitted by law, and shall maintain the premises in tenantable condition."),
          new Paragraph("This agreement shall be governed by mutual terms and termination clauses as per the standard format."),
          new Paragraph("\n\nSigned:\nLessor: ____________________\nLessee: ____________________"),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc); // Return the DOCX file buffer
};

module.exports = { generateDoc };
