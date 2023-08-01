import type { ApprovalFormPayloadType } from "./types"
import GTE_EIGHT_updateOrCreate from "./GTE_EIGHT/GTE_EIGHT_updateOrCreate"
import LT_EIGHT_updateOrCreate from "./LT_EIGHT/LT_EIGHT_updateOrCreate"
import REF_SCHEDULE_updateOrCreate from "./REF_SCHEDULE/REF_SCHEDULE_updateOrCreate"

const updateOrCreateApprovalForm = async (subjectId: string, payload: ApprovalFormPayloadType) => {
    const approvalFormType = payload.approvalFormType

    try {
        // // ทำการตรวจสอบว่าผู้ใช้ต้องการสร้าง หรือ อัปเดตฟอร์มอนุมัติประเภทใด
        switch (approvalFormType) {
            case "GTE_EIGHT":
                const GTE_EIGHT_result = await GTE_EIGHT_updateOrCreate(subjectId, payload)
                return GTE_EIGHT_result
            case "LT_EIGHT":
                const LT_EIGHT_result = await LT_EIGHT_updateOrCreate(subjectId, payload)
                return LT_EIGHT_result
            case "REF_SCHEDULE":
                const REF_SCHEDULE_result = await REF_SCHEDULE_updateOrCreate(subjectId, payload)
                return REF_SCHEDULE_result
            default:
                console.log("None of them")
                throw new Error("ไม่พบประเภทของแบบฟอร์มขออนุมัติผู้ช่วยสอนดังกล่าว")
        }
    } catch (error) {
        throw error
    }
}

export default updateOrCreateApprovalForm