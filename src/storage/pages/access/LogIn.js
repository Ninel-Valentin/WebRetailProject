import { useState } from 'react';
import styles from '../../style/modules/access.module.css';

import { Form } from "react-router-dom";

import { ReactComponent as OpenEye } from '../../svg/access/open_eye.svg';
import { ReactComponent as ClosedEye } from '../../svg/access/closed_eye.svg';

const LogIn = () => {
    const [passwordData, setPasswordData] = useState({
        passwordIsHidden: true
    });

    return (
        <>
            <Form
                className={styles.accessForm}
                id="logInForm"
                method='POST'>
                <div className={styles.formRow}>
                    <label htmlFor="logInEmail">Email:</label>
                    <input
                        required
                        placeholder="john.doe@domain.org"
                        name="email"
                        id="logInEmail"
                        minLength="5"
                        maxLength="100"
                        type="email"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="logInPassword">Password:</label>

                    <section className={styles.passwordSection}>
                        <input
                            required
                            name="password"
                            id="logInPassword"
                            data-password-toggle
                            minLength="5"
                            maxLength="85"
                            type={passwordData.passwordIsHidden ? "password" : "text"}
                        ></input>
                        <div
                            className={styles.passwordToggle}
                            onClick={() => setPasswordData({ ...passwordData, passwordIsHidden: !passwordData.passwordIsHidden })}>
                            {passwordData.passwordIsHidden ?
                                <ClosedEye className='whiteSVG'>
                                </ClosedEye>
                                :
                                <OpenEye className='whiteSVG'>
                                </OpenEye>}
                        </div>
                    </section>
                </div>
                <button type='submit' id={styles.logInButton}>Log In</button>
            </Form>
        </>
    );
}

export default LogIn;