import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import type { ApprovalFormPayloadType } from '@/app/api/subjects/[subjectId]/approvalForm/func/types'

/**
 * @param subjectId รหัสวิชาที่ต้องการสร้างหรืออัปเดตฟอร์มอนุมัติ TA
 * @description เป็นการสร้างหรืออัปเดตฟอร์มอนุมัติ TA โดยจะรองรับทั้ง 3 ฟอร์มหมดเลย เราต้องมีการแนบ payload มาสำหรับการเรียก mutate นี้ด้วย โดย payload จะต้องมีค่า approvalFormType ด้วย
 */

const useUpdateOrCreateApprovalForm = (subjectId: string) => {
    return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, ApprovalFormPayloadType>({
        mutationKey: ["updateOrCreateApprovalForm", subjectId],
        mutationFn: async (payload) => {
            return axios.put(`/api/subjects/${subjectId}/approvalForm`, payload)
        }
    })
}

export default useUpdateOrCreateApprovalForm