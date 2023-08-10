import type { ApprovalFormPayloadType } from "./types"
import PRACTICE_updateOrCreate from "./PRACTICE/PRACTICE_updateOrCreate"
import THEORY_updateOrCreate from "./THEORY/THEORY_updateOrCreate"
import PROJECTBASE_updateOrCreate from "./PROJECTBASE/PROJECTBASE_updateOrCreate"

const updateOrCreateApprovalForm = async (subjectId: string, payload: ApprovalFormPayloadType) => {
    const approvalFormType = payload.approvalFormType

    try {
        // // ทำการตรวจสอบว่าผู้ใช้ต้องการสร้าง หรือ อัปเดตฟอร์มอนุมัติประเภทใด
        switch (approvalFormType) {
            case "PRACTICE":
                const PRACTICE_result = await PRACTICE_updateOrCreate(subjectId, payload)
                return PRACTICE_result
            case "THEORY":
                const THEORY_result = await THEORY_updateOrCreate(subjectId, payload)
                return THEORY_result
            case "PROJECTBASE":
                const PROJECTBASE_result = await PROJECTBASE_updateOrCreate(subjectId, payload)
                return PROJECTBASE_result
            default:
                console.log("ไม่พบประเภทของแบบฟอร์มขออนุมัติผู้ช่วยสอนดังกล่าว")
                throw new Error("ไม่พบประเภทของแบบฟอร์มขออนุมัติผู้ช่วยสอนดังกล่าว")
        }
    } catch (error) {
        throw error
    }
}

export default updateOrCreateApprovalForm