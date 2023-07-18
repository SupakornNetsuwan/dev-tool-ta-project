
import Papa from "papaparse";
import {read, utils} from 'xlsx'
const ChangeXlsxToString = async (XlsxtFile : File):Promise<Papa.ParseResult<Record<string, unknown>>>=>{
    const fileData = XlsxtFile
    const arrayBuffer = await fileData.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    const workbook = read(data, { type: 'array' })
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    // จะได้ array ที่ index 0 เป็น header ของข้อมูลและ index ต่อมาจะเป็น ข้อมูล
    // defval set ให้ cell ไหนเป็น empty จะใส้่ '' แทน
    const jsonData: Array<Record<string, unknown>> = utils.sheet_to_json(worksheet, { header: 1, defval:"" });
    // จะได้ header ในแต่ละคอลัม 
    //  ['รหัสวิชา', 'หน่วยกิต', 'ชื่อวิชาภาษาไทย', 'ชื่อวิชาภาษาอังกฤษ', 'คำอธิบายรายวิชา', 'อาจารย์ผู้สอน']
    const header:string[] = jsonData[0] as unknown as string[]
    // จะได้ช้อมูลทั้งหมด ไม่เอา  header มาด้วย
    const dataRows = jsonData.slice(1)
    console.log("DataRow",dataRows)
    // XlsxObject 
    const XlsxObject = {
        courseData: dataRows.map((row) => {
          const rowObject: Record<string, string> = {}
          header.forEach((column, columnIndex) => {
            rowObject[column] = row[columnIndex]?.toString() as string;
          });
          return rowObject
        }),
      }
    console.log("XlsxObject",XlsxObject)
    // ปกติ Xlsx อาจจะมี cell เปล่าที่ข้างในไม่มีอะไร เราเลยจะ fileter เอา cell เปล่าพวกนั้นออกไป
    const XlsxWithOutEmtyArray = {  
        data: XlsxObject.courseData.filter((row) => Object.values(row).every((value) => value !== undefined)),
    };
    console.log("XlsxEMty",XlsxWithOutEmtyArray)
    console.log("test5")
    // change Xlsx that not have empy array to type Papa.ParseResult
    // Papa.ParsResult จะ มี data, errors, meta แต่เพราะว่า เราไม่้ได้ใช่ csv ในการแปลง ข้อมูลอย่าง errors และ meta จะต้องเขียนขึ้นมาเอง
    // คือยังไง ข้อมูล csv ที่โดนแปลงจะต้องเป็นใน format Papa.ParseResult และเวลาเอาไปใช้ใน TableCourse จะได้เป็น format เดียวกันในการส่งข้อมูล
    const xlsxResult:Papa.ParseResult<Record<string, unknown>> = {
        data: XlsxWithOutEmtyArray.data,
        errors :[],
        meta : {
          delimiter: '', // Provide a delimiter value appropriate for your data, e.g., ',' for comma-delimited.
          linebreak: '', // Provide the linebreak used in your data, e.g., '\r\n' for Windows or '\n' for Unix.
          aborted: false,
          truncated: false,
          cursor: 0
       }
    }
    return xlsxResult
}   

export default ChangeXlsxToString