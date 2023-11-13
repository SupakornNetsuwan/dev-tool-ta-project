import axios from "axios"

export interface LdapProfileType {
    id: string;
    uid: string;
    prenameTh: string;
    prenameEn: string;
    firstNameTh: string;
    lastNameTh: string;
    firstNameEn: string;
    lastNameEn: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    dn: string;
    organizationId: string;
    ou?: (string)[] | null;
    typeId: string;
    faculty: Faculty;
}
export interface Faculty {
    id: string;
    slug: string;
    uid: string;
    officialId: string;
    prefixNameTh: string;
    prefixNameEn: string;
    nameTh: string;
    nameEn: string;
    active: boolean;
    fullNameTh: string;
    fullNameEn: string;
}


const getProfileUser = async (username: string) => {
    try {
        return await axios.get<LdapProfileType>(`https://data.kmitl.ac.th/users/uid/${username}/`)
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error

        throw new Error(message)
    }
}

export default getProfileUser