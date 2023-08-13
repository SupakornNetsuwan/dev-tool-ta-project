"use client"
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType"
// custom hook
import FormatEnrolledData from "@/core/hooks/approvalForm/useFormatEnrolledData"
import CreateCSVFile from "@/core/hooks/approvalForm/useCreateCSVFile"
import ExportCSVFile from "@/core/hooks/approvalForm/useExportCSVFive"
// type
import { ApprovalFormFormattedType } from "@/core/hooks/approvalForm/useFormatEnrolledData"
import React, { useEffect,useState } from "react"
interface ExportCSVProviderProps {
    enrolledStudents: ResponseGetEnrollsType;
    fileName: string|undefined;
    children: React.ReactNode;
  }
const ExportCSVProvider : React.FC<ExportCSVProviderProps> = ({children, enrolledStudents, fileName})=>{
    const [formattedEnrolledStudents, setFormattedEnrolledStudents] = useState<ApprovalFormFormattedType >();
    useEffect(()=>{
        const enrolledStudentsFormatted = FormatEnrolledData(enrolledStudents)
        setFormattedEnrolledStudents(enrolledStudentsFormatted)
    },[enrolledStudents])
    const handleExportCSV =() =>{
        if (formattedEnrolledStudents) {
            const csvContent = CreateCSVFile(formattedEnrolledStudents)
            ExportCSVFile(csvContent, `แบบฟอร์มขออนุมัติ${fileName}`)
        }
    }
    return(
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-end justify-end p-4 bg-white dark:bg-gray-700 ">
                <div className="">
                    <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-whute bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                    onClick={handleExportCSV}
                    >
                        Export
                    </button>
                </div>
            </div>
            {children }
        </div>
        </>
    )

}
export default ExportCSVProvider