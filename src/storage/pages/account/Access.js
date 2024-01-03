import styles from '../../style/modules/access.module.css';

import { useState } from 'react';
import { Helmet } from 'react-helmet';

import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Access = () => {
    const [accessType, setAccessType] = useState("logIn");

    return (
        <>
            <Helmet>
                <title>Welcome!</title>
            </Helmet>
            <div className={styles.accessContainer}>
                <section className={styles.panelContainer} id={styles.backPanels}>
                    <div className={styles.panel}>
                        <h1>Hello, nice meeting you!</h1>
                        <h4>Tell us more about yourself</h4>
                        <SignUp />
                    </div>
                    <div className={styles.panel}>
                        <p className={styles.centerText}>
                            Not a user?
                            <br />
                            <span
                                className={styles.switchPanel}
                                onClick={(e) => { setAccessType("signUp"); }}>
                                Create your account right away!
                            </span>
                        </p>
                    </div>
                </section>
                <section className={`${styles.panelContainer}${accessType === 'signUp' ? ` ${styles.active}` : ''}`} id={styles.frontPanels}>
                    <div className={styles.panel}>
                        <p className={styles.centerText}>
                            Existing user?
                            <br />
                            <span className={styles.switchPanel} onClick={(e) => { setAccessType("logIn"); }}>
                                Log into your account right away!
                            </span>
                        </p>
                    </div>
                    <div className={styles.panel}>
                        <h1>Welcome back!</h1>
                        <LogIn />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Access;