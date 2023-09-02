import styles from '../style/modules/product.module.css';
import FetchData from '../scripts/FetchData';
import { useEffect, useState } from 'react';

import { GetCookie, SetCookie } from '../scripts/CookieService';

const NoPage = (props) => {

    useEffect(() => {
        document.title = '404 Page not found';
    }, []);

    return (
        <>
            <p>404 error</p>
        </>
    );
}

export default NoPage;