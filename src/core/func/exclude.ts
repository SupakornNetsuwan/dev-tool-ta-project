// Exclude keys from prisma object
function exclude<P, Key extends keyof P>(
    fields: P,
    keys: Key[]
): Omit<P, Key> {
    return Object.fromEntries(
        Object.entries(fields as [string, string]).filter(([key]) => !keys.includes(key as any))
    ) as Omit<P, Key>
}

export default exclude