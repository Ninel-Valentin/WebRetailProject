import { Outlet } from "react-router";
import { useEffect, useState } from 'react';

import Navigation from "./Navigation";

const Root = () => {
    const [userData, setUserData] = useState({
        session: {
            id: null
        }
    }, document.cookie);

    return (
        <>
            <Navigation />
            <main>
                {/* 
                //TODO: take the session data param in other pages for sign-up
                  */}
                <Outlet data={userData.session} />
                <footer>
                    <div>
                        Contact:
                        <ul>
                            <li>eMail: <i>valentinbanica8@gmail.com</i></li>
                            <li>
                                gitHub: <i><a href="https://github.com/Ninel-Valentin">https://github.com/Ninel-Valentin</a></i>
                            </li>
                        </ul>
                    </div>
                    <span>
                        Web retail project. All right reserved © Created by Ninel-Valentin
                        Bănică 2023
                    </span>
                </footer>
            </main>
        </>
    );
}

export default Root;