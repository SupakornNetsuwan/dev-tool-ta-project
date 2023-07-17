import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from 'xlsx'
// Change csv files
import Papa from "papaparse";
import { unknown } from "zod";

interface PreviewFile extends File {
  preview: string;
}

interface FileUploaderProps {
  onFileUpload: (file: File, resultData: Papa.ParseResult<Record<string, unknown>>) => void;
}

const FileUploadComponet: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  // function to manage files
  const onDrop = useCallback(
    async (acceptFiles: File[]) => {
      if (acceptFiles?.length) {
       
        // check type of files for changes 
        const fileTypes = acceptFiles[0].name.split('.').pop()
        switch(fileTypes){
          case "xls":
          case "xlsx" :{
              const fileData = acceptFiles[0];
              const arrayBuffer = await fileData.arrayBuffer()
              const data = new Uint8Array(arrayBuffer)
              const workbook = XLSX.read(data, { type: 'array' })
              const worksheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[worksheetName];
              const jsonData: Array<Record<string, unknown>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              const header:string[] = jsonData[0] as unknown as string[]
              const dataRows = jsonData.slice(1);

              const result = {
                data: dataRows.map((row) => {
                const rowObject: Record<string, string> = {}
                header.forEach((column, columnIndex) => {
                rowObject[column] = row[columnIndex]?.toString() as string;
                  });
        
                    return rowObject
                }),
              }
              const filteredResult = {
                data: result.data.filter((row) => Object.values(row).every((value) => value !== undefined)),
              };
              console.log(filteredResult)
    
          
            break
          }
          case "csv":{
            Papa.parse(acceptFiles[0], {
              header: true,
              skipEmptyLines: true,
              complete: (result: Papa.ParseResult<Record<string, unknown>>) => changeFileToString(result),
            });
            break
          }
          case "xls":{

          }
        }
        
      }
      // function to change xlsx or csv to string
      const changeFileToString = (results: Papa.ParseResult<Record<string, unknown>>) => {
        const rowsArray: string[][] = [];
        const valuesArray: unknown[][] = [];
        // Iterating data to get column name and their values
        results.data.map((d: Record<string, unknown>) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        // send file and result Data to parent components
        onFileUpload(acceptFiles[0], results);
      };
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"] , "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":[".xlsx"]},
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <div {...getRootProps({ className: "border-dashed border-gray-300 bg-white border-2" })}>
        <input {...getInputProps({ name: "file" })}></input>
        <div className="flex h-52 flex-col items-center justify-center gap-4 ">
          <p className="text-gray-500">
            {isDragActive ? <>วางไฟล์ที่นี่ หรือ คลิกเพื่ออัปโหลดรายวิชา</> : <>โปรดคลิกที่นี่ เพื่ออัปโหลดรายวิชา</>}
          </p>
        </div>
      </div>
    </>
  );
};
export default FileUploadComponet;
