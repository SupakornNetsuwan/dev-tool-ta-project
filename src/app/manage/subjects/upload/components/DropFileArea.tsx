import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// Change csv files
import Papa from "papaparse";

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
    (acceptFiles: File[]) => {
      if (acceptFiles?.length) {
        setFiles((previousFiles) => [
          ...acceptFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
        ]);
        // change file to object
        Papa.parse(acceptFiles[0], {
          header: true,
          skipEmptyLines: true,
          complete: (result: Papa.ParseResult<Record<string, unknown>>) => changeCSV(result),
        });
      }
      // function to change csv
      const changeCSV = (results: Papa.ParseResult<Record<string, unknown>>) => {
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
    accept: { "text/csv": [".csv"] },
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
