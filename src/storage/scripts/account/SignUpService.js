const Consts = require('../Consts.js');

async function HandleSignUpFormRequest(sender) {
    console.log(sender);

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    try {
        const formParameters = [...sender.target.elements].filter(x => x.name).map(x => `${x.name}=${encodeURIComponent(x.value)}`).join('&');
        const fetchResponse = await fetch(`http://127.0.0.1:5000/api/post/create-account?${formParameters}`, options);
        const data = await fetchResponse.json();
        return data;
    } catch (err) {
        console.log(JSON.stringify(err));
    }
}

function CheckValidity(sender) {
    if (sender.password.value !== sender.confirmPassword.value)
        return Consts.codeToValidityStatus.NotMatch;
    if (sender.password.value.length < 4)
        return Consts.codeToValidityStatus.ShortPassword;
    if (CheckPasswordFormat(sender.password.value))
        return Consts.codeToValidityStatus.InvalidPassword;

    return Consts.codeToValidityStatus.OK;
}

function CheckPasswordFormat(passwordValue) {
    // eslint-disable-next-line
    return passwordValue.replace(/[a-zA-Z0-9_\-!@<>\+=]/g, '').length !== 0;
}

function CheckPasswordStrength(passwordValue) {
    return (
        (passwordValue.length >= 15 ? 1 : 0) +
        (passwordValue.match(/[a-z]/)?.length > 0) +
        (passwordValue.match(/[A-Z]/)?.length > 0) +
        (passwordValue.match(/[0-9]/)?.length > 0) +
        // eslint-disable-next-line
        (passwordValue.match(/[_\-!@<>\+=]/)?.length > 0)
    );
}

function HandleValidityStatus(status) {
    switch (status) {
        case Consts.codeToValidityStatus.NotMatch:
            alert('Password does not match Confirm Password!');
            break;
        case Consts.codeToValidityStatus.ShortPassword:
            alert('Password is too short! It needs to be at least 5 characters long.');
            break;
        case Consts.codeToValidityStatus.InvalidPassword:
            alert('Password can only be made up by letters, digits and any of the following characters _-!@<>+=');
            break;
        default:
            console.error(`Unknown validity status: ${status}`);
    }
}

module.exports = { HandleSignUpForm: HandleSignUpFormRequest, CheckValidity, CheckPasswordStrength, HandleValidityStatus };