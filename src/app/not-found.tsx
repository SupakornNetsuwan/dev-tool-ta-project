import Link from "next/link";
import {HiOutlineArrowSmallLeft} from "react-icons/hi2"

const NotFound = () => {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center">
      <h2 className="text-xl font-medium text-red-500">ไม่พบหน้าที่ค้นหา</h2>
      <div>
        <Link className="text-gray-500 mt-2 underline flex underline-offset-2 items-center space-x-1" href="/">
          <HiOutlineArrowSmallLeft/>
          <p>กลับไปยังหน้าแรก</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
