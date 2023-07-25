import type { ProfileFormType } from "../../api/users/[id]/profile/ProfileFormType"

const modifyUploadDocuments = (UserDocument: ProfileFormType["UserDocument"]) => {

    return Object.fromEntries(
        Object.entries(UserDocument || {}).map(([key, file]: [string, string | null | FileList | File]) => {
            let modifiedFile = file;
            if (!file || typeof file === "string") modifiedFile = null;
            if (file instanceof FileList) modifiedFile = file[0];
            return [key, modifiedFile];
        })
    ) as ProfileFormType["UserDocument"];
}

export default modifyUploadDocuments