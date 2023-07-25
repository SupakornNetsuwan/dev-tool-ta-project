import storeFakeUser from "../src/core/auth/nextAuth/helper/storeFakeUser";
import { faker } from '@faker-js/faker';

const main = async () => {

    for await (const _ of Array(30).keys()) {
        const firstName = faker.person.firstName()
        const password = "123"
        const fullName = faker.person.fullName({ firstName })
        const fakeUser: Parameters<typeof storeFakeUser> = [firstName, password, fullName, "PROFESSOR"]
        storeFakeUser(...fakeUser)
        console.count("👨‍🏫 อาจารย์ทดสอบที่ถูกสร้าง")
    }
}

main()