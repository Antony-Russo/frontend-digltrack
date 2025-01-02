import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import axios from "axios";
import "./AddBranch.css"

const AddBranch = () => {
  const navigate = useNavigate()  
  const { id = '' } = useParams();
  const [branchDetails, setBranchDetails] = useState({
    branchCode: "",
    branchName: "",
    branchShortName: "",
    doorNo: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    panNo: "",
    gstin: "",
    vehicleType: "",
    branchType: "",
    contactNo: "",
    alternateContactNo: "",
    whatsappNumber: "",
    emailId: "",
    inchargeName: "",
    inchargeContactNo: "",
    inchargeWhatsappNumber: "",
    inchargeEmailId: "",
    personName: "",
    personContactNo: "",
    personWhatsappNumber: "",
    personEmailId: "",
    openingBalance: "",
    openingDate: "",
    minAmount: "",
    maxAmount: "",
    monthlyMaxAmount: "",
    maxUnallocatedAmount: "",
    effectiveDate: "",
    bankDetails: [
      {
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      },
    ],
    status: true,
  });

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(`https://keydraft-backend.onrender.com/api/branch/data/${id}`);
        setBranchDetails(response.data.data); // Set the branch data
      } catch (err) {
        console.error("Error fetching branch:", err);
      }
    };

    if (id) fetchBranch(); // Fetch branch only if ID exists
  }, [id]);

  // Update branch
  const handleChange = (e) => {
    setBranchDetails({
      ...branchDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBankDetailsChange = (index, e) => {
    const updatedBanks = [...branchDetails.bankDetails];
    updatedBanks[index][e.target.name] = e.target.value;
    setBranchDetails({ ...branchDetails, bankDetails: updatedBanks });
  };

  const addBankRow = () => {
    setBranchDetails({
      ...branchDetails,
      bankDetails: [
        ...branchDetails.bankDetails,
        { accountNumber: "", accountHolderName: "", ifscCode: "", bankName: "", branchName: "" },
      ],
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id){
        try {
            const response = await axios.put(`https://keydraft-backend.onrender.com/api/branch/branches/${id}`, branchDetails);
            console.log("Branch updated successfully:", response.data);
            alert('Updated successfully');
            navigate('/branches', { replace: true }); // Return the updated branch
          } catch (error) {
            console.error("Error updating branch:", error.response?.data || error.message);
          }
        
    }else{
        const response = await axios.post("https://keydraft-backend.onrender.com/api/branch/branches", branchDetails);
        if (response.success) {
            alert('Register successful');
            navigate('/branches', { replace: true });
      }
    }
    
  };

  const handelclose = () => {
    navigate("/branches")
  }

  return (
    <div className="add-branch-container">
        <div className="addBranch-container">
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <h2>Manage Branch</h2>
        {/* 1. Branch Details */}
        <div>
            <h4>1. Branch Details</h4>
            <input
            type="text"
            name="branchCode"
            value={branchDetails.branchCode}
            onChange={handleChange}
            placeholder="Branch Code"
            className="add-input"
            required
            />
            <input
            type="text"
            name="branchName"
            value={branchDetails.branchName}
            onChange={handleChange}
            placeholder="Branch Name"
            className="add-input"
            required
            />
            <input
            type="text"
            name="branchShortName"
            value={branchDetails.branchShortName}
            onChange={handleChange}
            placeholder="Branch Short Name"
            className="add-input"
            />
            <input
            type="text"
            name="doorNo"
            value={branchDetails.doorNo}
            onChange={handleChange}
            placeholder="Door/Flat/House No"
            className="add-input"
            />
            <input
            type="text"
            name="street"
            value={branchDetails.street}
            onChange={handleChange}
            placeholder="Street"
            className="add-input"
            />
            <input
            type="text"
            name="locality"
            value={branchDetails.locality}
            onChange={handleChange}
            placeholder="Locality"
            className="add-input"
            required
            />
            <input
            type="text"
            name="city"
            value={branchDetails.city}
            onChange={handleChange}
            placeholder="City"
            className="add-input"
            required
            />
            <input
            type="text"
            name="state"
            value={branchDetails.state}
            onChange={handleChange}
            placeholder="State"
            className="add-input"
            required
            />
            <input
            type="text"
            name="pincode"
            value={branchDetails.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="add-input"
            required
            />
            <input
            type="text"
            name="panNo"
            value={branchDetails.panNo}
            onChange={handleChange}
            placeholder="PAN No"
            className="add-input"
            />
            <input
            type="text"
            name="gstin"
            value={branchDetails.gstin}
            onChange={handleChange}
            placeholder="GSTIN"
            className="add-input"
            />
        </div>

        {/* 2. Branch Contact Details */}
        <div>
            <h4>2. Branch Contact Details</h4>
            <input
            type="text"
            name="contactNo"
            value={branchDetails.contactNo}
            onChange={handleChange}
            placeholder="Contact No"
            className="add-input"
            />
            <input
            type="text"
            name="alternateContactNo"
            value={branchDetails.alternateContactNo}
            onChange={handleChange}
            placeholder="Alternate Contact No"
            className="add-input"
            />
            <input
            type="text"
            name="whatsappNumber"
            value={branchDetails.whatsappNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="add-input"
            />
            <input
            type="email"
            name="emailId"
            value={branchDetails.emailId}
            onChange={handleChange}
            placeholder="Email ID"
            className="add-input"
            />
        </div>

        {/* 3. Branch Incharge Details */}
        <div>
            <h4>3. Branch Incharge Details</h4>
            <input
            type="text"
            name="inchargeName"
            value={branchDetails.inchargeName}
            onChange={handleChange}
            placeholder="Incharge Name"
            className="add-input"
            />
            <input
            type="text"
            name="inchargeContactNo"
            value={branchDetails.inchargeContactNo}
            onChange={handleChange}
            placeholder="Contact No"
            className="add-input"
            />
            <input
            type="text"
            name="inchargeWhatsappNumber"
            value={branchDetails.inchargeWhatsappNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="add-input"
            />
            <input
            type="email"
            name="inchargeEmailId"
            value={branchDetails.inchargeEmailId}
            onChange={handleChange}
            placeholder="Email ID"
            className="add-input"
            />
        </div>

        {/* 4. Contact Person Details */}
        <div>
            <h4>4. Contact Person Details</h4>
            <input
            type="text"
            name="personName"
            value={branchDetails.personName}
            onChange={handleChange}
            placeholder="Contact Person Name"
            className="add-input"
            />
            <input
            type="text"
            name="personContactNo"
            value={branchDetails.personContactNo}
            onChange={handleChange}
            placeholder="Contact No"
            className="add-input"
            />
            <input
            type="text"
            name="personWhatsappNumber"
            value={branchDetails.personWhatsappNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="add-input"
            />
            <input
            type="email"
            name="personEmailId"
            value={branchDetails.personEmailId}
            onChange={handleChange}
            placeholder="Email ID"
            className="add-input"
            />
        </div>

        {/* 5. Opening Details */}
        <div>
            <h4>5. Opening Details</h4>
            <input
            type="number"
            name="openingBalance"
            value={branchDetails.openingBalance}
            onChange={handleChange}
            placeholder="Opening Balance"
            className="add-input"
            />
            <input
            type="date"
            name="openingDate"
            value={branchDetails.openingDate}
            onChange={handleChange}
            placeholder="Opening Date"
            className="add-input"
            />
        </div>

        {/* 6. Advance Request Details */}
        <div>
            <h4>6. Advance Request Details</h4>
            <input
            type="number"
            name="minAmount"
            value={branchDetails.minAmount}
            onChange={handleChange}
            placeholder="Minimum Amount"
            className="add-input"
            />
            <input
            type="number"
            name="maxAmount"
            value={branchDetails.maxAmount}
            onChange={handleChange}
            placeholder="Maximum Amount"
            className="add-input"
            />
            <input
            type="number"
            name="monthlyMaxAmount"
            value={branchDetails.monthlyMaxAmount}
            onChange={handleChange}
            placeholder="Monthly Maximum Amount"
            className="add-input"
            />
            <input
            type="number"
            name="maxUnallocatedAmount"
            value={branchDetails.maxUnallocatedAmount}
            onChange={handleChange}
            placeholder="Maximum Unallocated Amount"
            className="add-input"
            />
            <input
            type="date"
            name="effectiveDate"
            value={branchDetails.effectiveDate}
            onChange={handleChange}
            placeholder="Effective Date"
            className="add-input"
            />
        </div>

        {/* 7. Bank Details */}
        <div>
            <h4>7. Bank Details</h4>
            {branchDetails.bankDetails.map((bank, index) => (
            <div key={index}>
                <input
                type="text"
                name="accountNumber"
                value={bank.accountNumber}
                onChange={(e) => handleBankDetailsChange(index, e)}
                placeholder="Account Number"
                className="add-input"
                />
                <input
                type="text"
                name="accountHolderName"
                value={bank.accountHolderName}
                onChange={(e) => handleBankDetailsChange(index, e)}
                placeholder="Account Holder Name"
                className="add-input"
                />
                <input
                type="text"
                name="ifscCode"
                value={bank.ifscCode}
                onChange={(e) => handleBankDetailsChange(index, e)}
                placeholder="IFSC Code"
                className="add-input"
                />
                <input
                type="text"
                name="bankName"
                value={bank.bankName}
                onChange={(e) => handleBankDetailsChange(index, e)}
                placeholder="Bank Name"
                className="add-input"
                />
                <input
                type="text"
                name="branchName"
                value={bank.branchName}
                onChange={(e) => handleBankDetailsChange(index, e)}
                placeholder="Branch Name"
                className="add-input"
                />
            </div>
            ))}
            <button type="button" onClick={addBankRow} className="add-bank-btn">
            Add Bank
            </button>
        </div>

        {/* Submit */}
        <div className="add-btn-container">
        <button type="button" className="add-submit-btn" onClick={handelclose}>Close</button>
        <button type="submit" className="close-btn">Submit</button>
        </div>
        </form>
    </div>
    </div>
  );
};

export default AddBranch;
