"use client"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Courses } from '@prisma/client';
import Link from 'next/link';
interface CardCourseProp {
    course : Courses
}
const CardCourse:React.FC<CardCourseProp> = ({course}) =>{
    return(
        <>
            <Card sx={{ maxWidth: 300,maxHeight: 200, minHeight: 200}}>
                <CardContent sx={{minHeight:150}}>
                    <Typography sx={{mt:0, fontSize:'10px'}} color="text.secondary"   >
                        ชื่อวิชา
                    </Typography>
                    <Typography gutterBottom  sx={{mb:1,fontSize:'14px'}}>
                        {course.courseNameEng}
                    </Typography>
                    <Typography sx={{mt:0, fontSize:'10px'}} color="text.secondary"  >
                        รหัสวิชา
                    </Typography>
                    <Typography gutterBottom  sx={{mb:0,fontSize:'14px'}} >
                        {course.courseId}
                    </Typography>
                </CardContent>
                <CardActions sx={{display:'flex', alignItems:'end', justifyContent:'flex-end'}}>
                    <Link href={`/manage/subjects/${course.courseNameEng.replaceAll(" ","-")}`}><Button size="small">รายละเอียด</Button></Link>
                    <Button className='text-red' size="small" color='error'>ลบรายวิชา</Button>
                </CardActions>
            </Card>
        </>
    )
}
export default CardCourse