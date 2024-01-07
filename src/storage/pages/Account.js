import { useNavigate } from "react-router";
import { GetCookie } from "../scripts/CookieService";
import { useEffect } from "react";

const Account = () => {

    const accountCookies = GetCookie('account');
    const navigate = useNavigate();
    useEffect(() => {
        if (!accountCookies) {
            navigate('/access', { replace: true })
        }
        // eslint-disable-next-line
    }, [accountCookies]);

    return (
        <>

        </>
    );
}

export default Account;