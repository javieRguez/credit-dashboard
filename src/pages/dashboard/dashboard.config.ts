
export interface DataExcel {
    PRIMER_NOMBRE: string;
    SEGUNDO_NOMBRE: string;
    APELLIDO_PATERNO: string;
    APELLIDO_MATERNO: string;
    FECHA_DE_NACIMIENTO: string;
    RFC: string;
    COLONIA_O_POBLACION: string;
    DELEGACION_O_MUNICIPIO: string;
    CIUDAD: string;
    ESTADO: string;
    " C.P.": string;
    DIRECCION_CALLE_NUMERO: string;
    SALDO_ACTUAL: string;
    LIMITE_DE_CREDITO: string;
    SALDO_VENCIDO: string;
}

export interface Client {
    name: string;
    birthdate: string;
    rfc: string;
    colony: string;
    municipality: string;
    city: string;
    state: string;
    zipCode: string;
    address: string;
    currentBalance: string;
    creditLimit: string;
    defeatedBalance: string;
}

export const headsWidthKeys = [
    {
        key: "name",
        label: "Nombre"
    },
    {
        key: "birthdate",
        label: "Fecha de nacimiento"
    },
    {
        key: "rfc",
        label: "RFC"
    },
    {
        key: "colony",
        label: "Colonia"
    },
    {
        key: "municipality",
        label: "Municipio"
    },
    {
        key: "city",
        label: "Ciudad"
    },
    {
        key: "state",
        label: "Estado"
    },
    {
        key: "zipCode",
        label: "Código postal"
    },
    {
        key: "address",
        label: "Dirección"
    },
    {
        key: "currentBalance",
        label: "Saldo actual"
    },
    {
        key: "creditLimit",
        label: "Límite de crédito"
    },
    {
        key: "defeatedBalance",
        label: "Saldo vencido"
    },
]

export const dataMapping = (data: DataExcel[]): Client[] => {
    return data.map(item => {
        return {
            name: `${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE} ${item.APELLIDO_PATERNO} ${item.APELLIDO_MATERNO}`,
            birthdate: item.FECHA_DE_NACIMIENTO,
            rfc: item.RFC,
            colony: item.COLONIA_O_POBLACION,
            municipality: item.DELEGACION_O_MUNICIPIO,
            city: item.CIUDAD,
            state: item.ESTADO,
            zipCode: item[" C.P."],
            address: item.DIRECCION_CALLE_NUMERO,
            currentBalance: item.SALDO_ACTUAL,
            creditLimit: item.DIRECCION_CALLE_NUMERO,
            defeatedBalance: item.SALDO_VENCIDO
        }
    })
}