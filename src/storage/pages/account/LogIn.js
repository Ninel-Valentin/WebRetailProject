import styles from '../../style/modules/access.module.css';

import { Form } from "react-router-dom";

const LogIn = () => {
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
                        type="email"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="logInPassword">Password:</label>
                    <input
                        required
                        name="password"
                        id="logInPassword"
                        type="password"></input>
                </div>
                <button type='submit' id={styles.logInButton}>Log In</button>
            </Form>
        </>
    );
}

export default LogIn;