import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const CsvXlsxToJson = () => {
  const [jsonData, setJsonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendToMongoDB = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/save-data", data);
      setSuccessMessage("Data successfully saved to MongoDB!");
      console.log("Response:", response.data);
    } catch (error) {
      setErrorMessage("Failed to save data to MongoDB.");
      console.error("Error:", error);
    }
  };

  const csvToJson = (csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header] = values[index]?.trim() || "";
        return acc;
      }, {});
    });
  };

  const xlsxToJson = (data) => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = json[0].map((header) => header.trim());
    return json.slice(1).map((row) => {
      return row.reduce((acc, cell, index) => {
        acc[headers[index] || `Column_${index + 1}`] = cell || "";
        return acc;
      }, {});
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrorMessage("No file selected.");
      return;
    }

    const reader = new FileReader();
    const fileExtension = file.name.split(".").pop().toLowerCase();

    reader.onload = (event) => {
      try {
        const fileData = event.target.result;
        let json;

        if (fileExtension === "csv") {
          json = csvToJson(fileData);
        } else if (fileExtension === "xlsx") {
          json = xlsxToJson(fileData);
        } else {
          throw new Error("Unsupported file type.");
        }

        setJsonData(json);
        sendToMongoDB(json); // Send JSON data to MongoDB
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (fileExtension === "xlsx") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>CSV or XLSX to JSON Converter</h1>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {jsonData && (
        <div>
          <h2>Parsed JSON:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvXlsxToJson;
