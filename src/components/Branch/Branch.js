import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, IconButton, Box } from "@mui/material";
import { FaFileExcel, FaPlus, FaExpand, FaCompress } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { CircularProgress, Backdrop } from "@mui/material";
import * as XLSX from "xlsx";
import { CiSaveDown2 } from "react-icons/ci";
import "./Branch.css"

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate()

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

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://keydraft-backend-1.onrender.com/api/branch/data");
      setBranches(response.data.data || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches(); // Call the async function inside useEffect
  }, []);

  // Fullscreen toggle
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // Table Columns
  const columns = [
    { field: "_id", headerName: "#", width: 70 },
    { field: "branchName", headerName: "Branch Name", width: 200, sortable: true },
    { field: "branchCode", headerName: "Branch Code", width: 150, sortable: true },
    { field: "branchShortName", headerName: "Branch Short Name", width: 180, sortable: true },
    { field: "locality", headerName: "Locality", width: 200, sortable: true },
    { field: "city", headerName: "City", width: 150, sortable: true },
    { field: "state", headerName: "State", width: 150, sortable: true },
    { field: "personName", headerName: "ContactPerson", width: 190, sortable: true },
    { field: "personContactNo", headerName: "ContactPersonNo", width: 150, sortable: true },
    { field: "panNo", headerName: "Pan No", width: 150, sortable: true },
    { field: "gstin", headerName: "GSTNO", width: 150, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false, // Disable sorting for the Actions column
      renderCell: (params) => (
        <>
          {/* Edit Button */}
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row._id)}
          >
            <CiEdit />
          </IconButton>
          {/* View Button */}
          <IconButton
            size="small"
            color="secondary"
            onClick={() => handleView(params.row._id)}
          >
            <MdOutlineVisibility />
          </IconButton>
          {/* Delete Button */}
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <MdOutlineDelete />
          </IconButton>
        </>
      ),
    },
  ];

  const handelAddBranch = () => {
    navigate('/addbranch');
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter rows based on search input
  const filteredRows = branches.filter((branch) =>
    branch.branchName?.toLowerCase().includes((search || "").toLowerCase())
  );

  // Handlers for edit and delete
  const handleEdit = (id) => {
    navigate(`/addbranch/${id}`)
  };

  const handleView = async (id) => {
    setDialogOpen(true); // Set the state to true, opening the dialog
    const response = await axios.get(`https://keydraft-backend-1.onrender.com/api/branch/data/${id}`);
    setBranchDetails(response.data.data);
  };

  const handleClose = () => {
    setDialogOpen(false); // Set the state to false, closing the dialog
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://keydraft-backend-1.onrender.com/api/branch/branches/${id}`);
    fetchBranches();
  };

  const handleDownload = () => {
    // 1. Create a new workbook
    const workbook = XLSX.utils.book_new();
    // 2. Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(branches);
    // 3. Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branch Details");
    // 4. Generate and download the Excel file
    XLSX.writeFile(workbook, "BranchDetails.xlsx");
  };

  const Loader = ({ open }) => {
    return (
      <Backdrop
        open={open}
        style={{
          zIndex: 1201,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  return (
    <>
      <Loader open={loading} />
      <NavBar />
      <div className="branch-main-container">
        <div className={isFullScreen ? "fullscreen-container" : "table-container branch-container"}>
          <header className="header">
            <h1>Branch</h1>
            <div className="actions">
              <Button variant="contained" startIcon={<FaPlus />} onClick={handelAddBranch}>
                Add Branch
              </Button>
              <Button variant="outlined" startIcon={<FaFileExcel />} onClick={() => navigate("/uploadExcel")}>
                Import/Export
              </Button>
              <Button onClick={handleDownload}><CiSaveDown2 fontSize={25} /></Button>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
              />
              <IconButton onClick={toggleFullScreen}>
                {isFullScreen ? <FaCompress /> : <FaExpand />}
              </IconButton>
            </div>
          </header>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              getRowId={() => uuid()}
              checkboxSelection
              disableSelectionOnClick
              disableColumnMenu
              components={{
                NoRowsOverlay: () => <div>No Data Found</div>,
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
            />
          </Box>
        </div>

        <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Branch View</DialogTitle>
          <DialogContent>
            <div>
              <h3 className="dialog-head">1. Branch Details</h3>
              <p><b>Branch Name:</b> {branchDetails.branchName}</p>
              <p><b>Branch Code:</b> {branchDetails.branchCode}</p>
              <p><b>Short Name:</b> {branchDetails.branchShortName}</p>
              <p><b>Street:</b> {branchDetails.street}</p>
              <p><b>City:</b> {branchDetails.city}</p>
              <p><b>State:</b> {branchDetails.state}</p>
              <p><b>Pincode:</b> {branchDetails.pincode}</p>
              <p><b>PAN No:</b> {branchDetails.panNo}</p>
              <p><b>GSTIN:</b> {branchDetails.gstin}</p>
              <p><b>Branch Type:</b> {branchDetails.branchType}</p>

              <h3 className="dialog-head">2. Branch Contact Details</h3>
              <p><b>Contact No:</b> {branchDetails.contactNo}</p>
              <p><b>Alternate No:</b> {branchDetails.alternateContactNo}</p>
              <p><b>Whatsapp No:</b> {branchDetails.whatsappNumber}</p>
              <p><b>Email ID:</b> {branchDetails.emailId}</p>

              <h3 className="dialog-head">3. Branch Incharge Details</h3>
              <p><b>Incharge Name:</b> {branchDetails.inchargeName}</p>
              <p><b>Contact No:</b> {branchDetails.inchargeContactNo}</p>
              <p><b>Alternate No:</b> {branchDetails.inchargeWhatsappNumber}</p>
              <p><b>Whatsapp No:</b> {branchDetails.inchargeWhatsappNumber}</p>
              <p><b>Email ID:</b> {branchDetails.inchargeEmailId}</p>

              <h3 className="dialog-head">4. Contact Person Details</h3>
              <p><b>Contact Person Name:</b> {branchDetails.personName}</p>
              <p><b>Contact No:</b> {branchDetails.personContactNo}</p>
              <p><b>Whatsapp No:</b> {branchDetails.personWhatsappNumber}</p>
              <p><b>Email ID:</b> {branchDetails.personEmailId}</p>

              <h3 className="dialog-head">5. Opening Details</h3>
              <p><b>Date:</b> {branchDetails.openingDate}</p>
              <p><b>Amount:</b> {branchDetails.openingBalance}</p>

              <h3 className="dialog-head">6. Advance Request Details</h3>
              <p><b>Minimum Amount:</b> {branchDetails.minAmount}</p>
              <p><b>Maximum Amount:</b> {branchDetails.maxAmount}</p>
              <p><b>Monthly Max Amount:</b> {branchDetails.monthlyMaxAmount}</p>
              <p><b>Max UnAllocated Amount:</b> {branchDetails.maxUnallocatedAmount}</p>
              <p><b>Effective Date:</b> {branchDetails.effectiveDate}</p>

              <h3 className="dialog-head">7. Bank Accounts</h3>
              {branchDetails.bankDetails.map((bank, index) => (
                <div key={index}>
                  <p><b>Account Number:</b> {bank.accountNumber}</p>
                  <p><b>Account Holder Name:</b> {bank.accountHolderName}</p>
                  <p><b>IFSC Code:</b> {bank.ifscCode}</p>
                  <p><b>Bank Name:</b> {bank.bankName}</p>
                  <p><b>Branch Name:</b> {bank.branchName}</p>
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 14px', borderRadius: '5px' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Branch;
