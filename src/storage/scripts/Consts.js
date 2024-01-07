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
        OK: 'OK',
        NotMatch: 'NotMatch',
        SecQNotSelected: 'SecQNotSelected',
        InvalidPassword: 'InvalidPassword',
        WeakPassword: 'WeakPassword'
    };
}

module.exports = {
    Consts
};