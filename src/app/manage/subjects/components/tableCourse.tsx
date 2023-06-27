import React from "react";
import Papa from "papaparse";
import { ParsedDataType } from "./FileInput/ParsedDataTypes";

type TableCourseProps = {
  fileFromUpload: File | undefined;
  setParsedData: (parsedData: ParsedDataType[]) => void;
};

interface PreviewFile extends File {
  preview: string;
}

import { useState, useEffect } from "react";
const TableCourse: React.FC<TableCourseProps> = ({ fileFromUpload, setParsedData }) => {
  //State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);
  //State to store the values
  const [dataEachCell, setDataEachCell] = useState<any[]>([]);

  const changeCSV = (results: Papa.ParseResult<any>) => {
    const rowsArray: string[][] = [];
    const valuesArray: any[][] = [];
    // Iterating data to get column name and their values
    results.data.map((d: any) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });
    // Parsed Data and send to ParentsComponent
    setParsedData(results.data);
    // Filtered Column Names
    setTableRows(rowsArray[0]);
    // Filtered Values
    setDataEachCell(valuesArray);  
  };

  useEffect(() => {
    if (fileFromUpload != undefined) {
      Papa.parse(fileFromUpload, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => changeCSV(result),
      });
    }
  }, [fileFromUpload]);

  return (
    <>
      {fileFromUpload && (
        <div key={fileFromUpload.name}>
          <table className="w-full">
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return (
                    <th className="w-52 border border-gray-300 text-center" key={index}>
                      {rows}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {dataEachCell.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val: any, i: any) => {
                      return (
                        <td className="w-52 border border-gray-300 text-center" key={i}>
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2 text-[12px] font-medium text-stone-500">ชื่อไฟล์ : {fileFromUpload.name}</p>
        </div>
      )}
    </>
  );
};

export default TableCourse;
