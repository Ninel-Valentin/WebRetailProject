import styles from '../../style/modules/access.module.css';

import { Form } from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <Form
                className={styles.accessForm}
                id="signUpForm"
                method='POST'>
                <div className={styles.formRow}>
                    <label htmlFor="signUpUser">Full name:</label>
                    <input
                        placeholder="John Doe"
                        name="user"
                        id="signUpUser"
                        type="text"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="signUpEmail"><span className={styles.required}>*</span> Email:</label>
                    <input
                        required
                        placeholder="john.doe@domain.org"
                        name="email"
                        id="signUpEmail"
                        type="email"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="signUpPassword"><span className={styles.required}>*</span> Password:</label>
                    <input
                        required
                        name="password"
                        id="signUpPassword"
                        type="password"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="confirmPassword"><span className={styles.required}>*</span> Confirm password:</label>
                    <input
                        required
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="birthday">Date of birth:</label>
                    <input
                        name="birthday"
                        id="birthday"
                        max={new Date().toISOString().split("T").shift()}
                        type="date"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="secQuestion"><span className={styles.required}>*</span> Security question:</label>
                    <select
                        required
                        name="secQuestion"
                        id="secQuestion"
                        form="signUpForm"
                        defaultValue="none">
                        <option
                            value="none"
                            disabled
                            hidden>Select a security question</option>
                        {/* TODO:Load the options from the database */}
                    </select>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="secAnswer"><span className={styles.required}>*</span> Answer:</label>
                    <input
                        required
                        name="secAnswer"
                        id="secAnswer"
                        type="text"></input>
                </div>
                <br />
                <p className={styles.requiredWarning}><i>Fields marked with <span className={styles.required}>*</span> are required</i></p>
                <button
                    type='submit'
                    id={styles.signUpButton}>Sign Up</button>
            </Form>
        </>
    );
}

export default SignUp;