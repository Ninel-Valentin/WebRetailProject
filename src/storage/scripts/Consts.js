class Consts {

    static errors = (code, err, ...additionalFields) => {
        const { retryCount } = additionalFields;

        switch (code) {
            case 1:
                return `ERROR (code 1): Error connecting to the MSSQL database (Retry ${retryCount}).\n Err: ${err}`
            default:
                break;
        }
    }

    static codeToValidityStatus = {
        OK: 0,
        NotMatch: 1,
        ShortPassword: 2,
        InvalidPassword: 3
    };
}

module.exports = {
    Consts
};