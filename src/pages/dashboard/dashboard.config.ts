
export interface PersonBalance {
    name: string;
    amount: number
}
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
    "C.P.": string;
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

export const headsWithKeysClients = [
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

const ddMMyyyy = (dateString: string) => {
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);

    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) {
        return "Fecha inválida";
    }
    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}


export const dataMapping = (data: DataExcel[]): Client[] => {
    return data.map(item => {
        return {
            name: `${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE ?? ""} ${item.APELLIDO_PATERNO} ${item.APELLIDO_MATERNO}`,
            birthdate: ddMMyyyy(item.FECHA_DE_NACIMIENTO),
            rfc: item.RFC,
            colony: item.COLONIA_O_POBLACION,
            municipality: item.DELEGACION_O_MUNICIPIO,
            city: item.CIUDAD,
            state: item.ESTADO,
            zipCode: item["C.P."],
            address: item.DIRECCION_CALLE_NUMERO,
            currentBalance: item.SALDO_ACTUAL,
            creditLimit: item.LIMITE_DE_CREDITO,
            defeatedBalance: item.SALDO_VENCIDO
        }
    })
}


export const sumCurrentBalance = (clients: Client[]) => {
    return clients.reduce((prev, current) => {
        return prev + parseFloat(current.currentBalance);
    }, 0)
}
export const sumCreditLimit = (clients: Client[]) => {
    return clients.reduce((prev, current) => {
        return prev + parseFloat(current.creditLimit);
    }, 0)
}
export const sumDefeatedBalance = (clients: Client[]) => {
    return clients.reduce((prev, current) => {
        return prev + parseFloat(current.defeatedBalance);
    }, 0)
}

export const sumAvailableBalance = (clients: Client[]) => {
    return clients.reduce((prev, current) => {
        return prev + (parseFloat(current.creditLimit) - parseFloat(current.currentBalance));
    }, 0)
}

export const highestCurrentBalance = (clients: Client[]): PersonBalance => {
    const client = clients.reduce((prev, current) => {
        return parseFloat(current.currentBalance) > parseFloat(prev.currentBalance) ? current : prev;
    })

    return { amount: parseFloat(client.currentBalance), name: client.name }
}

export const lowerCurrentBalance = (clients: Client[]): PersonBalance => {
    const client = clients.reduce((prev, current,) => {
        return parseFloat(current.currentBalance) < parseFloat(prev.currentBalance) ? current : prev;
    })
    return { amount: parseFloat(client.currentBalance), name: client.name }

}

export const groupedData = (clients: Client[]) => {
    return clients.reduce<Record<string, number>>((acc, client) => {
        if (!acc[client.state]) {
            acc[client.state] = 0;
        }
        acc[client.state] += parseFloat(client.currentBalance as unknown as string);
        return acc;
    }, {});
}


export const headsWithKeysExchangeRate = [
    {
        key: "fecha",
        label: "Fecha"
    },
    {
        key: "dato",
        label: "Fix"
    },
]