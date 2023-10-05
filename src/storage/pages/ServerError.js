import styles from '../style/modules/product.module.css';
import FetchData from '../scripts/FetchData';
import { useEffect, useState } from 'react';

import { GetCookie, SetCookie } from '../scripts/CookieService';

const NoPage = (props) => {

    useEffect(() => {
        document.title = '500 Server error, sorry';
    }, []);

    return (
        <>
            <p>500 server error</p>
        </>
    );
}

export default NoPage;