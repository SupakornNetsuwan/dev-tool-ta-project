import { Prisma } from "@prisma/client";
import type { SystemStatus } from "@prisma/client";

export type SystemStatusPayloadType = {
    openDate: Dayjs | null;
    closeDate: Dayjs | null;
    semester: number;
    year: number;
};

export type SystemStatusResponseType = (SystemStatus & { isOpen: boolean }) | undefined;