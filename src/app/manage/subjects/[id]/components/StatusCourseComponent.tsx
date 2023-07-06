"use client"
import DetailCourseComponent from "./DetailCourseComponent"
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// ้hook 
import useGetDetailCourse from "../hook/useGetDetailCourse";
const StatusCourse: React.FC<{ course: string}> = ({course}) => {
    const queryCourse = course.replaceAll("-"," ")
    const { data, isLoading, isError } = useGetDetailCourse(queryCourse)
    const router = useRouter();
    
    if (isLoading) return ( 
    <>
        <div className="relative flex  flex-col  overflow-hidden animate-pulse  mt-5 ">
            <div className="flex items-center justify-center" >
                <div className="w-8/12 bg-blue-400  p-2 ">
                    
                </div>
            </div>
        </div>
    </>)
    if (isError) return <p>เกิดข้อผิดพลาด</p>;

    const courseDetail = data.data.data;

    return(
        <>  
           
            <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500" >
                <HiOutlineArrowSmallLeft />
                <span>ย้อนกลับ</span>
            </button>
            <DetailCourseComponent course={courseDetail}></DetailCourseComponent>
            <div className="relative flex  flex-col  overflow-hidden bg-gray-50  mt-5 ">
                <div className="flex items-center justify-center" >
                    <div className="w-8/12 bg-white p-2 ">
                        <p className="text-sx text-blue-500 font-medium">การคัดเลือก</p>
                        <dl className="divide-y ">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">สถานะการคัดเลือก</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">คัดเลือกเรียบร้อย</dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">รายชื่อนึกศึกษาที่ผ่านการคัดเลือก</dt>
                                <dd className="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">ตรวจสอบรายชื่อ</dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">แบบฟอร์มขออนุมัตินักศึกษา(excel.)</dt>
                                <dd className="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">ดาวน์โหลด</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StatusCourse