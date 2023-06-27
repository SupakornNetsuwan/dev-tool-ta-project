import React from "react"
import Papa from 'papaparse';
import { ParsData } from "./parseDataType";
interface TableCourseProps {
    fileFromUpload: File | undefined;
    onParsedData :any
  }
interface PreviewFile extends File {
    preview: string;
  }
import { useState, useEffect} from "react"
const TableCourse:React.FC<TableCourseProps> = ({fileFromUpload, onParsedData }) =>{

    //State to store table Column name
    const [tableRows, setTableRows] = useState<string[]>([]);
    //State to store the values
    const [dataEachCell, setDataEachCell] = useState<any[]>([]);

    useEffect(() => {
        const changeCSV = (results: Papa.ParseResult<any>) =>{
            const rowsArray: string[][] = [];
            const valuesArray: any[][] = [];
            // Iterating data to get column name and their values
            results.data.map((d:any) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
            });
            // Parsed Data and send to ParentsComponent
            onParsedData(results.data)
            // Filtered Column Names
            setTableRows(rowsArray[0]);
            // Filtered Values
            setDataEachCell(valuesArray);  
        }
        if(fileFromUpload != undefined){
            Papa.parse(fileFromUpload,{
                header: true,
                skipEmptyLines : true,
                    complete: (result)=>changeCSV(result)
                    
            })
        }
    },[fileFromUpload, onParsedData])
    
    return(
        <>
            {fileFromUpload && 
                <div key={fileFromUpload.name}>
                    <table className="w-full">
                        <thead>
                            <tr>
                                {tableRows.map((rows, index) => {
                                return <th className="border border-gray-300 w-52 text-center"  key={index}>{rows}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {dataEachCell.map((value, index) => {
                                return (
                                 <tr key={index}>
                                    {value.map((val:any, i:any) => {
                                    return <td className="border border-gray-300 w-52 text-center"   key={i}>{val}</td>;
                                    })}
                                </tr>
                                 );
                             })}
                        </tbody>
                    </table>
                    <p className='mt-2 text-[12px] font-medium text-stone-500'>
                        ชื่อไฟล์ : {fileFromUpload.name}
                    </p>
                </div>
        }
        </>
    )
}

export default TableCourse