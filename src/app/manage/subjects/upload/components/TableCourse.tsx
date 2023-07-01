import React from "react";
import Papa from "papaparse";

type TableCourseProps = {
  fileFromUpload: File | undefined;
  fileObject: Papa.ParseResult<Record<string, unknown>> | undefined;
};

import { useState, useEffect } from "react";

const TableCourse: React.FC<TableCourseProps> = ({ fileFromUpload, fileObject }) => {
  //State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);
  //State to store the values
  const [dataEachCell, setDataEachCell] = useState<string[][]>([]);

  useEffect(() => {
    if (fileObject?.data) {
      const rowsArray: string[][] = [];
      const valuesArray: string[][] = [];
    
      fileObject?.data.map((d: any) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });
      // Filtered Column Names
      setTableRows(rowsArray[0]);
      // Filtered Values
      setDataEachCell(valuesArray);
    }
  }, [fileFromUpload, fileObject]);

  return (
    <>
      {fileFromUpload && (
        <div key={fileFromUpload.name} className="overflow-y-auto">
          <h3 className="my-4 font-medium text-gray-500">ตัวอย่างไฟล์ : {fileFromUpload.name}</h3>
          <table className="w-full min-w-[50em] bg-white">
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return (
                    <th className="border border-gray-300 py-2 text-center font-medium text-gray-800" key={index}>
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
                        <td className="border border-gray-300 text-center text-gray-500" key={i}>
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default React.memo(TableCourse);
