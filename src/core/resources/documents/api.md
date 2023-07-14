# การเรียกใช้ API


## /api/users

### GET
ทำการดึงข้อมูลผู้ใช้งานทั้งหมด

## /api/users/[id]

### PATCH
ทำการแก้ไขข้อมูล User ทั่วไป (ไม่รวมถึง Profile และ UserDocument)

## /api/users/[id]/profile

### GET
ทำการดึงข้อมูล Profile ของผู้ใช้งานรวมถึง UserDocument ด้วย

### PATCH
ทำการแก้ไข​ Profile ของผู้ใช้งานรวมถึง UserDocument ด้วย