const cpfValidator = (cpf: string): boolean => {
    const cpfClean = cpf.replace(/\D/g, "");
    if (cpfClean.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpfClean)) {
        return false;
    }

    const cpfArray = Array.from(cpfClean).map((digit) => parseInt(digit));

    const calculateDigit = (cpfArray: number[], length: number): number => {
        const sum = cpfArray.slice(0, length).reduce((acc, digit, index) => {
            return acc + digit * (length + 1 - index);
        }, 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstDigit = calculateDigit(cpfArray, 9);
    const secondDigit = calculateDigit(cpfArray, 10);

    return firstDigit === cpfArray[9] && secondDigit === cpfArray[10];
};

const cnpjValidator = (cnpj: string): boolean => {
    const cnpjClean = cnpj.replace(/\D/g, "");
    if (cnpjClean.length !== 14) {
        return false;
    }

    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calculateDigit = (weights: number[], cnpjArray: number[]): number => {
        const sum = cnpjArray.slice(0, weights.length).reduce((acc, digit, index) => acc + digit * weights[index], 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const cnpjArray = Array.from(cnpjClean).map((digit) => parseInt(digit));

    const firstDigit = calculateDigit(firstWeights, cnpjArray);
    const secondDigit = calculateDigit(secondWeights, cnpjArray.concat(firstDigit));

    return firstDigit === cnpjArray[12] && secondDigit === cnpjArray[13];
};

const phoneValidator = (phone: string): boolean => {
    const phoneClean = phone.replace(/\D/g, "");
    return phoneClean.length === 11 || phoneClean.length === 10;
};

export { cpfValidator, cnpjValidator, phoneValidator };
