import React from "react";
import Papa from "papaparse";

type TableCourseProps = {
  fileFromUpload: File | undefined;
  fileObject: Papa.ParseResult<Record<string, unknown>> | undefined
};


import { useState, useEffect } from "react";

const TableCourse: React.FC<TableCourseProps> = ({ fileFromUpload, fileObject}) => {
  //State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);
  //State to store the values
  const [dataEachCell, setDataEachCell] = useState<any[]>([]);
  useEffect(() => {
    if(fileObject?.data){
      const rowsArray: string[][] = [];
      const valuesArray: any[][] = [];
      console.log(fileObject?.data)
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
