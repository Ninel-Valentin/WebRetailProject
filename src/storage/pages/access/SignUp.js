import styles from '../../style/modules/access.module.css';

import { useEffect, useState } from 'react';
import { Form } from "react-router-dom";
import { HandleSignUpFormRequest, CheckValidity, CheckPasswordStrength, HandleValidityStatus } from '../../scripts/account/SignUpService.js';
import { ConnectToAccount } from '../../scripts/account/LogInService.js';

import { ReactComponent as OpenEye } from '../../svg/access/open_eye.svg';
import { ReactComponent as ClosedEye } from '../../svg/access/closed_eye.svg';

const SignUp = () => {
    const [pageData, setPageData] = useState({
        passwordIsHidden: true,
        confirmIsHidden: true,
        passwordComplexity: 0,
        securityQuestions: []
    });

    useEffect(() => {
        (async () => {
            try {
                const domain = window.location.origin.replace(/:\d+/g, '');

                const response = await fetch(`${domain}:5000/api/secQ`, {
                    method: "GET"
                });
                const data = await response.json();
                setPageData({
                    ...pageData,
                    securityQuestions: data.recordset
                });
            }
            catch (err) {
                console.error(`Security questions can't be fetched!`);
            }
        })();
        // eslint-disable-next-line
    }, [pageData.securityQuestions.length]);

    return (
        <>
            <Form
                autoComplete="off"
                className={styles.accessForm}
                id="signUpForm"
                onSubmit={async e => {
                    e.preventDefault();
                    const validityCode = CheckValidity(e.target);
                    if (validityCode !== 'OK') HandleValidityStatus(validityCode);
                    else {
                        const response = await HandleSignUpFormRequest(e);
                        if (response.statusCode === '409')
                            alert('An account using this email already exists!');
                        else
                            console.log(response.statusCode)
                    };
                }}
                method='POST'
            >
                <div className={styles.formRow}>
                    <label htmlFor="signUpUser">Full name:</label>
                    <input
                        placeholder="John Doe"
                        name="user"
                        id="signUpUser"
                        minLength="5"
                        maxLength="100"
                        type="text"></input>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="signUpEmail"><span className={styles.required}>*</span> Email:</label>
                    <input
                        required
                        placeholder="john.doe@domain.org"
                        name="email"
                        id="signUpEmail"
                        minLength="5"
                        maxLength="100"
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
                            minLength="5"
                            maxLength="85"
                            type={pageData.passwordIsHidden ? "password" : "text"}
                            onChange={(e) => {
                                setPageData({
                                    ...pageData,
                                    passwordComplexity: CheckPasswordStrength(e.target.value)
                                });
                            }}
                        ></input>
                        <div
                            className={styles.passwordToggle}
                            onClick={() => setPageData({ ...pageData, passwordIsHidden: !pageData.passwordIsHidden })}>
                            {pageData.passwordIsHidden ? <ClosedEye></ClosedEye> : <OpenEye></OpenEye>}
                        </div>
                    </section>
                </div>
                <div className={styles.formRow}>
                    <hr className={`${styles.complexityBar} ${styles[`grade-${pageData.passwordComplexity}`]}`} />
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="confirmPassword"><span className={styles.required}>*</span> Confirm password:</label>
                    <section className={styles.passwordSection}>
                        <input
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            data-password-toggle
                            minLength="5"
                            maxLength="85"
                            type={pageData.confirmIsHidden ? "password" : "text"}></input>
                        <div
                            className={styles.passwordToggle}
                            onClick={() => setPageData({ ...pageData, confirmIsHidden: !pageData.confirmIsHidden })}>
                            {pageData.confirmIsHidden ? <ClosedEye></ClosedEye> : <OpenEye></OpenEye>}
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
                        {pageData.securityQuestions.map((optionJson, index) =>
                            <option
                                value={optionJson.Id}
                                key={`SecQ_${index}`}>
                                {optionJson.Question}
                            </option>
                        )}
                    </select>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="secAnswer"><span className={styles.required}>*</span> Answer:</label>
                    <input
                        required
                        name="secAnswer"
                        id="secAnswer"
                        type="text"
                        maxLength="100"></input>
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