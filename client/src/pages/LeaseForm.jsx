import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LeaseForm() {
  const [formData, setFormData] = useState({
    lessorName: "",
    lessorAddress: "",
    lesseeName: "",
    lesseeAddress: "",
    propertyAddress: "",
    leaseYears: "",
    startDate: "",
    monthlyRent: "",
    interestRate: "",
    municipalTax: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    const response = await fetch('/api/generate-docx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lease-agreement.docx';
    link.click();
  };

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
    municipalTax,
  } = formData;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-8 gap-8 bg-white text-gray-800 font-serif">
      {/* Left Panel - Input Form */}
      <div className="space-y-4 border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Lease Agreement Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="lessorName" placeholder="Lessor Name" value={lessorName} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="lessorAddress" placeholder="Lessor Address" value={lessorAddress} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="lesseeName" placeholder="Lessee Name" value={lesseeName} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="lesseeAddress" placeholder="Lessee Address" value={lesseeAddress} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="propertyAddress" placeholder="Property Address" value={propertyAddress} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="leaseYears" placeholder="Lease Term (years)" value={leaseYears} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="startDate" placeholder="Start Date (e.g., 01 Jan 2025)" value={startDate} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="monthlyRent" placeholder="Monthly Rent (Rs)" value={monthlyRent} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="interestRate" placeholder="Interest Rate (%)" value={interestRate} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
          <input name="municipalTax" placeholder="Annual Municipal Tax (Rs)" value={municipalTax} onChange={handleChange} className="border border-gray-300 p-2 rounded" />
        </div>
        <div className="pt-4 text-center">
          <Button onClick={handleDownload} className="w-full bg-blue-500 text-white">Download DOCX</Button>
        </div>
      </div>

      {/* Right Panel - Document Preview */}
      <div className="border rounded-xl p-6 shadow-sm whitespace-pre-wrap overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Agreement Preview</h2>
        <p className="leading-relaxed">
          This Deed of Lease is made between <strong>{lessorName || "[Lessor]"}</strong> of {lessorAddress || "[Address]"} and <strong>{lesseeName || "[Lessee]"}</strong> of {lesseeAddress || "[Address]"}.<br /><br />
          The Lessor hereby leases the property at {propertyAddress || "[Property Address]"} to the Lessee for a term of {leaseYears || "[X]"} years, commencing from {startDate || "[Start Date]"}, for a monthly ground rent of Rs. {monthlyRent || "[Amount]"}.<br /><br />
          If the rent is unpaid, the Lessee shall pay interest at {interestRate || "[Rate]"}% per annum. The Lessee shall also pay municipal taxes of Rs. {municipalTax || "[Amount]"} annually.<br /><br />
          The Lessee may construct, alter, or renovate structures on the property as permitted by law, and shall maintain the premises in tenantable condition.<br /><br />
          This agreement shall be governed by mutual terms and termination clauses as per the standard format.<br /><br />
          Signed:<br />Lessor: ____________________<br />Lessee: ____________________
        </p>
      </div>
    </div>
  );
}
