import styles from '../../style/modules/access.module.css';

import { useState } from 'react';
import { Form } from "react-router-dom";
import { HandleSignUpForm, CheckValidity, CheckPasswordStrength, HandleValidityStatus } from '../../scripts/account/SignUpService';

import { ReactComponent as OpenEye } from '../../svg/access/open_eye.svg';
import { ReactComponent as ClosedEye } from '../../svg/access/closed_eye.svg';

const SignUp = () => {
    const [passwordData, setPasswordData] = useState({
        password: true,
        confirm: true,
        complexity: 0
    });

    return (
        <>
            <Form
                autoComplete="off"
                className={styles.accessForm}
                id="signUpForm"
                onSubmit={e => {
                    e.preventDefault();
                    const validityCode = CheckValidity(e.target);
                    if (validityCode) HandleValidityStatus(validityCode);
                    else HandleSignUpForm(e);
                }}
                method='POST'
            >
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
                    <section className={styles.passwordSection}>
                        <input
                            required
                            name="password"
                            id="signUpPassword"
                            data-password-toggle
                            type={passwordData.password ? "password" : "text"}
                            onChange={(e) => {
                                setPasswordData({
                                    ...passwordData,
                                    complexity: CheckPasswordStrength(e.target.value)
                                });
                            }}
                        ></input>
                        <div
                            className={styles.passwordToggle}
                            onClick={() => setPasswordData({ ...passwordData, password: !passwordData.password })}>
                            {passwordData.password ? <ClosedEye></ClosedEye> : <OpenEye></OpenEye>}
                        </div>
                    </section>
                </div>
                <div className={styles.formRow}>
                    <hr className={`${styles.complexityBar} ${styles[`grade-${passwordData.complexity}`]}`} />
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="confirmPassword"><span className={styles.required}>*</span> Confirm password:</label>
                    <section className={styles.passwordSection}>
                        <input
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            data-password-toggle
                            type={passwordData.confirm ? "password" : "text"}></input>
                        <div
                            className={styles.passwordToggle}
                            onClick={() => setPasswordData({ ...passwordData, confirm: !passwordData.confirm })}>
                            {passwordData.confirm ? <ClosedEye></ClosedEye> : <OpenEye></OpenEye>}
                        </div>
                    </section>
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
                        <option
                            value="1"> Option 1
                        </option>
                        <option
                            value="2"> Option 2
                        </option>
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