import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchCourse = async ()=>{
    const response = await axios.get("/api/manage/subject")
    return response.data
}
const useGetCourse = () =>{
    return useQuery(["courses"], fetchCourse)
}
export default useGetCourse