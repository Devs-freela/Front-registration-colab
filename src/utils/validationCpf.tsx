export function validationCpf(cpf: Number) {
    let cpfA = cpf.toString();
    cpfA = cpfA.replace(/\D/g, '');
    cpfA = cpfA.replace(/(\d{3})(\d)/, '$1.$2');
    cpfA = cpfA.replace(/(\d{3})(\d)/, '$1.$2');
    cpfA = cpfA.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpfA;
}

export function formatPhoneNumber(phoneNumber: any) {

    const numericValue = phoneNumber.replace(/\D/g, '');

    let formattedPhoneNumber = numericValue;
    if (numericValue.length > 2) {
        formattedPhoneNumber = `(${numericValue.slice(0, 2)}`;
    }
    if (numericValue.length > 2) {
        formattedPhoneNumber = `${formattedPhoneNumber}) ${numericValue.slice(2, 7)}`;
    }
    if (numericValue.length > 7) {
        formattedPhoneNumber = `${formattedPhoneNumber}-${numericValue.slice(7, 11)}`;
    }

    return formattedPhoneNumber;
}