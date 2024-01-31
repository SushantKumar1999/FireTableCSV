import React, { useState } from "react";
import Papa from "papaparse";
import icon from "../assets/Icon.png";
import excelicon from "../assets/Frame 7682.png";

const Card = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState(""); // New state to store the uploaded file name

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadedFileName(file.name); // Update the state with the file name
      Papa.parse(file, {
        complete: (result) => {
          if (!result.data || result.data.length < 2) {
            console.error("Invalid CSV file format.");
            return;
          }

          const expectedColumns = ["id", "links", "prefix", "select tags", "selected tags"];
          const fileColumns = Object.keys(result.data[0]);

          if (!expectedColumns.every((col) => fileColumns.includes(col))) {
            console.error("Invalid CSV file format. Missing expected columns.");
            return;
          }

          const formattedData = result.data.slice(1).map((row, index) => ({
            ...row,
            "S.no": index + 1,
          }));

          setCsvData(formattedData);
        },
        header: true,
      });
    }
  };

  const handleTagSelection = (rowIndex, selectedTag) => {
    const updatedSelectedTags = [...selectedTags, { rowIndex, tag: selectedTag }];
    setSelectedTags(updatedSelectedTags);

    // Remove the selected tag from the dropdown options
    const updatedCsvData = [...csvData];
    const selectedRowIndex = updatedSelectedTags.find((tag) => tag.tag === selectedTag)?.rowIndex;
    if (selectedRowIndex !== undefined) {
      updatedCsvData[selectedRowIndex]["select tags"] = updatedCsvData[selectedRowIndex]["select tags"]
        .split(",")
        .filter((tag) => tag.trim() !== selectedTag)
        .join(",");
    }

    setCsvData(updatedCsvData);
  };

  const handleRemoveFile = () => {
    // Remove the uploaded file and reset states
    setUploadedFileName("");
    setCsvData([]);
    setSelectedTags([]);
  };

  return (
    <div className="flex flex-wrap w-full items-center gap-6 justify-center lg:gap-0 overflow-auto">
      <div className="flex flex-col text-black py-5 shadow-xl border-2 border-slate-200 w-[613px] h-[367px] mt-[218px] px-6 bg-[#FFFFFF]">
        <label htmlFor="fileInput" className="rounded flex flex-wrap w-full items-center gap-6 justify-center lg:gap-0 w-[564px] h-[258px] border border-dotted">
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <img alt="excelicon" src={excelicon} />
          {uploadedFileName ? ( // Display file name if available
          <div>
            <p>{uploadedFileName}</p>
            <span onClick={handleRemoveFile} style={{ color: "red", cursor: "pointer", marginLeft:"40px" }}>
            Remove
          </span>
          </div>
          ) : (
            <div  className="flex flex-wrap w-full items-center gap-3 justify-center lg:gap-1 ">
            <p>Drop your CSV file here or <p className="text-[#605BFF]">Browse</p></p>
            </div>
            
          )}
        </label>
        <button className="bg-[#605BFF] rounded-xl w-[564px] h-[56px] mt-[17px] font-bold text-white">
          <label htmlFor="fileInput" className="flex flex-wrap w-full items-center gap-6 justify-center lg:gap-0">
            <img alt="dashboard" src={icon} />
            Upload
          </label>
        </button>
      </div>

      {/* Display the CSV data in a table */}
      {csvData.length > 0 && (

        <div className="upload" style={{ paddingTop: "80px" }} >
          <p className="para" style={{ font: "figtree", fontSize: "24px", }}>Uploads</p>
          <div className="mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className=" rounded table-auto w-full shadow-md mt-5 border-separate border-spacing-y-3 w-[1165px] h-[496px]">
              <thead className="sticky top-0 h-[35px] w-[957px] bg-[#F5F5F5]">
                <tr>
                  <th>S.no</th>
                  <th>Links</th>
                  <th>Prefix</th>
                  <th>Add Tags</th>
                  <th>Selected Tags</th>
                </tr>
              </thead>
              <tbody className="bg-[#FFFFFF]">
                {csvData.slice(0, 39).map((row, index) => (
                  <tr className="h-[58px] w-[957px] " key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{row["links"]}</td>
                    <td>{row["prefix"]}</td>
                    <td>  
                      <select
                      value={selectedTags.find((tag) => tag.rowIndex === index)?.tag || "Select tags"}
                      onChange={(e) => handleTagSelection(index, e.target.value)}
                      >
                      <option disabled>Select tags</option>
                      {row["select tags"].split(",").map((tag, tagIndex) => (
                        <option key={tagIndex} value={tag.trim()}>
                          {tag.trim()}
                        </option>
                      ))}
                      </select>
                    </td>
                    <td >{selectedTags
                      .filter((tag) => tag.rowIndex === index)
                      .map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-[#605BFF] rounded h-[24px] w-[60px] text-white justify-centre" style={{display: "inline-block", marginRight:"10px"}}>
                        {tag.tag}
                        </span>
                      ))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
