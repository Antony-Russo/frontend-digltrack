import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { read, utils } from "xlsx";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FiUpload } from "react-icons/fi";
import "./UploadBranch.css"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadBranch = () => {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [isPreview, setIsPreview] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (file) => {
        setFile(file);
    };

    const handlePreview = () => {
        setIsPreview(true)
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = read(binaryStr, { type: "binary" });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet
                const sheetData = workbook.Sheets[sheetName];

                // Convert sheet data to JSON
                const jsonData = utils.sheet_to_json(sheetData, { header: 1 });

                // Generate column definitions based on the first row of data
                const columns = jsonData[0].map((col, index) => ({
                    field: `col${index}`, headerName: col, width: 150,
                }));

                // Generate rows using the rest of the data
                const rows = jsonData.slice(1).map((row, index) => {
                    const rowData = row.reduce((acc, val, idx) => {
                        acc[`col${idx}`] = val;
                        return acc;
                    }, {});
                    return { id: index + 1, ...rowData }; // Ensure the row has an 'id'
                });

                // Set the state for columns and rows
                setColumns(columns);
                setRows(rows);
            };
            reader.readAsBinaryString(file);
        } else {
            alert("Please upload a file before previewing.");
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            await fetch("https://keydraft-backend-1.onrender.com/api/branch/upload", {
                method: "POST",
                body: formData,
            });
            alert("File saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Error saving file.");
        }
    };

    const handleDelete = () => {
        // Filter rows to remove selected rows
        const updatedRows = rows.filter((row) => !selectionModel.includes(row.id));
        setRows(updatedRows); // Update rows state to remove selected rows
        console.log(selectionModel);
        console.log(rows);
    };

    return (
        <div className="upload-container">
            <div className="upload-branch-container">
                <h1 className="upload-head">Branch Upload</h1>
                <div className="branch-upload">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<FiUpload />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => handleFileChange(event.target.files[0])}
                            multiple
                        />
                    </Button>
                </div>
                <div className="upload-file">
                    {file && (
                        <>
                            <b>File Name:</b> {file?.name}
                        </>
                    )}
                </div>

                {isPreview && rows.length > 0 && (
                    <div className="upload-grid">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            onRowSelectionModelChange={(selectedIds) => {
                                console.log('Selected Row IDs:', selectedIds);
                                setSelectionModel(selectedIds);// Handle selected rows
                            }}
                            hideFooter
                        />
                    </div>
                )}

                <div>
                    {!isPreview && (<button onClick={handlePreview} className="btn-upload">
                        Preview
                    </button>)}

                    {isPreview && (
                        <>
                            <button onClick={handleSave} className="btn-upload">
                                Save
                            </button>
                            <button onClick={handleDelete} className="btn-upload">
                                Delete Selected
                            </button>
                        </>
                    )}
                    <button onClick={() => navigate("/branches")} className="btn-upload">
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
};


export default UploadBranch;
