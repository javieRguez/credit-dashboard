
export const numberToPrice = (number: number): string => {
    return number.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
    })
}