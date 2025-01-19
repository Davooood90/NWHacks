import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const CsvXlsxToJson = () => {
  const [jsonData, setJsonData] = useState(null);          // To store and display parsed JSON
  const [errorMessage, setErrorMessage] = useState("");    // To handle and display errors
  const [successMessage, setSuccessMessage] = useState(""); // To display success messages

  // Function to convert CSV to JSON
  const csvToJson = (csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",").map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      headers.forEach((header, index) => {
        obj[header] = currentline[index] ? currentline[index].trim() : "";
      });

      result.push(obj);
    }

    return result;
  };

  // Function to convert XLSX to JSON
  const xlsxToJson = (data) => {
    try {
      const workbook = XLSX.read(data, { type: "array" });
      // console.log(workbook);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // console.log(sheet, sheetName);
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      console.log(json);

      if (!json || json.length === 0) {
        throw new Error("The XLSX file is empty or has invalid structure.");
      }

      const headers = json[0].map(header => header.trim());
      const result = json.slice(1).map(row => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index] || `Column_${index + 1}`] = cell ? cell.toString().trim() : "";
        });
        return obj;
      });

      return result;
    } catch (error) {
      console.error("Error parsing XLSX file:", error);
      throw new Error("Failed to parse XLSX file. Ensure it's a valid XLSX format.");
    }
  };

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrorMessage("");     // Reset error message
    setJsonData(null);       // Reset previous JSON data
    setSuccessMessage("");   // Reset success message

    if (!file) {
      setErrorMessage("No file selected.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const validExtensions = ["csv", "xlsx"];

    if (!validExtensions.includes(fileExtension)) {
      setErrorMessage("Unsupported file type. Please upload a CSV or XLSX file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = event.target.result;
      let json;

      try {
        if (fileExtension === "csv") {
          json = csvToJson(fileData);
        } else if (fileExtension === "xlsx") {
          json = xlsxToJson(fileData);
        }

        setJsonData(json); // Update state with parsed JSON

        // Process the JSON data as per your original script
        if (json.length > 2 && json[2]["My Enrolled Courses"]) {
          const temp = json[2]["My Enrolled Courses"];
          const tempArr = temp.split(" - ");

          const userJson = {
            name: tempArr[0].replace(/[1234567890()]/g, "").trim(),
            id: tempArr[0].replace(/[a-zA-Z()]/g, "").trim(),
            faculty: tempArr[1],
            start_date: tempArr[2],
          };

          // console.log("User Info:", userJson);

          let courseL = [];

          for (let i = 2; i < json.length; i++) {
            if (!json[i]["My Enrolled Courses"]) continue;

            const term = json[i]["My Enrolled Courses"].includes("Term 1") ? 1 : 2;
            const courseJson = {
              name: json[i]["Column_2"] || "",
              credits: json[i]["Column_3"] || "",
              grading: json[i]["Column_4"] || "",
              section: json[i]["Column_5"] || "",
              term: term,
              format: json[i]["Column_6"] || "",
              mode: json[i]["Column_7"] || "",
              meeting: json[i]["Column_8"] || "",
              status: json[i]["Column_9"] || "",
              instructor: json[i]["Column_10"] || "",
              start: json[i]["Column_11"] || "",
              end: json[i]["Column_12"] || "",
            };

            // console.log("Course Info:", courseJson);
            courseL.push(courseJson);
          }

          const userData = {
            name: userJson.name,
            id: userJson.id,
            faculty: userJson.name,
            start_date: userJson.start_date, 
            email: "john.doe@example.com",
            courseList: courseL,
          };

          console.log(userData);

          axios.post("http://localhost:3000/save-json", userData);

        } else {
          console.warn("The JSON structure does not contain 'My Enrolled Courses' at index 2.");
        }
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>CSV or XLSX to JSON Converter</h1>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {jsonData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Parsed JSON:</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CsvXlsxToJson;
