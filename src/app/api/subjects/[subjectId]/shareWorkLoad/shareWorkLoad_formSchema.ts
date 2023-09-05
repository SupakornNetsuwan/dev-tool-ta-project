import { z } from "zod"

const schema = z.object({
    shareWorkloadFile: z.any().nullish(),
})

export default schema