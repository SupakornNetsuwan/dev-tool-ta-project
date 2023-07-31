import type { ApprovalFormPayloadType } from "./types"
import GTE_EIGHT_updateOrCreate from "./GTE_EIGHT/GTE_EIGHT_updateOrCreate"

const updateOrCreateApprovalForm = async (subjectId: string, payload: ApprovalFormPayloadType) => {
    const approvalFormType = payload.approvalFormType

    try {
        // // ทำการตรวจสอบว่าผู้ใช้ต้องการสร้าง หรือ อัปเดตฟอร์มอนุมัติประเภทใด
        switch (approvalFormType) {
            case "GTE_EIGHT":
                const GTE_EIGHT_result = await GTE_EIGHT_updateOrCreate(subjectId, payload)
                return GTE_EIGHT_result
            default:
                console.log("None of them")
                break
        }
    } catch (error) {
        throw error
    }
}

export default updateOrCreateApprovalForm