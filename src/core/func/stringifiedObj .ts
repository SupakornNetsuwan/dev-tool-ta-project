/**
 * @description ทำให้ value ใน object ที่เป็น number กลายเป็น string
 *  */

const stringifiedObj = (item: Object) => Object.fromEntries(
    Object.entries(item).map(([key, value]) => [key, typeof value === "number" ? value.toString() : value])
)

export default stringifiedObj