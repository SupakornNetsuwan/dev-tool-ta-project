import dynamic from 'next/dynamic'
const page: React.FC<{ params: { subjectId: string, } }> = ({ params: { subjectId } }) => {
  return (
    <>
        <div>แบบฟอร์มขออนุมัติ</div>
    </>
  );
  
};

export default page;