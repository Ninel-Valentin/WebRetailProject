import { useEffect, useState } from 'react';

const Verification = (props) => {

    const urlParams = new URLSearchParams(window.location.href.split('?').pop());

    useEffect(() => {
        document.title ='Account verification';
    }, [urlParams]);

    return (
        verificationPage(urlParams.get('activate'))
    );
}

function verificationPage(verificationType) {
    switch (verificationType) {
        default:
        case 'true':
            return <>
                <p>
                    Hello! Thank you for creating your account! Go a step further to activate your account:
                </p>
                <p>
                    Press here to enjoy more features now for free!
                    {/* {
                        //TODO: Add logic to activate
                    } */}
                </p>
            </>
        case 'false':
            return <>
                <p>
                    Hello! If you wanted to create this account, press here
                    {/* {
                        //TODO: Add logic to activate
                    } */}
                </p>
                <p>
                    If this was not you and you want the account to be deleted, press here:
                    {/* {
                        //TODO: Add logic to activate
                    } */}
                </p>
            </>
    }
}


export default Verification;