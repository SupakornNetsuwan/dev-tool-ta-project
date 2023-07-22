import storeFakeUser from "../src/core/auth/nextAuth/helper/storeFakeUser";
import { faker } from '@faker-js/faker';
import createCourse from "@/app/api/subjects/func/createCourse";
import createSystemStatus from "@/app/api/systemStatus/func/createSystemStatus";
import dayjs from "dayjs";

const main = async () => {

    const professorEarth = await storeFakeUser("earth", "123", "PhD. Earth Netsuwan", "PROFESSOR")
    await storeFakeUser("admin", "123", "admin", "ADMIN")
    for await (const _ of Array(30).keys()) {
        const firstName = faker.person.firstName()
        const password = "123"
        const fullName = faker.person.fullName({ firstName })
        const fakeUser: Parameters<typeof storeFakeUser> = [firstName, password, fullName, "PROFESSOR"]
        storeFakeUser(...fakeUser)
        console.count("👨‍🏫 อาจารย์ทดสอบที่ถูกสร้าง")
    }

    await createSystemStatus({ openDate: dayjs().add(1, "day"), closeDate: dayjs().add(20, "days"), semester: 1, year: dayjs().year() + 543 })

    await createCourse([{
        "subjectId": "SUB001",
        "professorId": professorEarth.id,
        "nameEng": "Physics",
        "nameThai": "วิชาฟิสิกส์",
        "credit": "(3-3)",
        "description": "An introduction to the principles of Physics",
        "creationStatus": "UNCREATED",
        "title": "นาย",
        "firstname": null,
        "lastname": null,
        "contact": null,
        "enrollCondition": null,
        "secretCode": null,
        "approvalForm": null
    }, {
        "subjectId": "SUB002",
        "professorId": professorEarth.id,
        "nameEng": "Chemistry",
        "nameThai": "วิชาเคมี",
        "credit": "4",
        "description": "Introduction to Organic Chemistry",
        "creationStatus": "CREATED",
        "title": "นาย",
        "firstname": null,
        "lastname": null,
        "contact": null,
        "enrollCondition": null,
        "secretCode": null,
        "approvalForm": null
    },
    {
        "subjectId": "SUB003",
        "professorId": professorEarth.id,
        "nameEng": "Mathematics",
        "nameThai": "วิชาคณิตศาสตร์",
        "credit": "3",
        "description": "Calculus and Linear Algebra",
        "creationStatus": "UNCREATED",
        "title": "นาย",
        "firstname": null,
        "lastname": null,
        "contact": null,
        "enrollCondition": null,
        "secretCode": null,
        "approvalForm": null
    }])
}

main()