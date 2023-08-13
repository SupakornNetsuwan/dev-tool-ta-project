// custom hook
const ExportCsv = (csvContent: string, nameFile:string) =>{
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", nameFile);
    link.click();
    URL.revokeObjectURL(url);
}
export default ExportCsv