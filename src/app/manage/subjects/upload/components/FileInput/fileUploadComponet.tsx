import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import React from "react";

interface PreviewFile extends File {
  preview: string;
}
interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}
const FileUploadComponet: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const onDrop = useCallback((acceptFiles: File[]) => {
    if (acceptFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
    // ส่งไฟล์ ที่จะนำไปสร้างตัวอย่่างไปหา parent component
    onFileUpload(acceptFiles[0]);
  }, []);

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
      <div {...getRootProps({ className: "custom border-dashed border-grey-500 border-2" })}>
        <input {...getInputProps({ name: "file" })}></input>
        <div className="flex h-52 flex-col items-center justify-center gap-4">
          {isDragActive ? <p>Drop the CSV files here ...</p> : <p>ลากและปล่อยไฟล์ หรือคลิ๊กเพื่ออัพโหลดรายวิชา</p>}
        </div>
      </div>
    </>
  );
};
export default FileUploadComponet;
