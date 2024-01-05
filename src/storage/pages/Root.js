import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Root = () => {
    return (
        <>
            <nav>
                <Link to="wishlist" className="button">
                    <svg viewBox="0 0 212.045 212.045" className="opposite blueSvg">
                        <g>
                            <path
                                d="M167.871 0H44.84C34.82 0 26.022 8.243 26.022 18v182c0 3.266.909 5.988 2.374 8.091a9.204 9.204 0 0 0 7.598 3.954c2.86 0 5.905-1.273 8.717-3.675l55.044-46.735c1.7-1.452 4.142-2.284 6.681-2.284 2.538 0 4.975.832 6.68 2.288l54.86 46.724c2.822 2.409 5.657 3.683 8.512 3.683 4.828 0 9.534-3.724 9.534-12.045V18c0-9.757-8.131-18-18.151-18z"
                            ></path>
                        </g>
                    </svg>
                    <p className="buttonTxt desktop">Wishlist</p>
                </Link>
                <hr />
                <Link to="cart" className="button">
                    <svg viewBox="0 0 512 512" className="opposite blueSvg">
                        <g>
                            <circle cx="226" cy="436.002" r="45"></circle>
                            <circle cx="377" cy="436.002" r="45"></circle>
                            <path
                                d="M15 61.002h62.553l72.418 253.513-5.68 11.36c-14.956 29.88 6.755 65.127 40.254 65.127H437c8.291 0 15-6.709 15-15s-6.709-15-15-15H184.545c-11.139 0-18.419-11.729-13.418-21.709l4.146-8.291H437a15.012 15.012 0 0 0 14.429-10.884l60-210a15.04 15.04 0 0 0-2.446-13.154 15.048 15.048 0 0 0-11.982-5.962H117.323L103.29 41.885a15.013 15.013 0 0 0-14.429-10.884H15c-8.291 0-15 6.709-15 15s6.709 15.001 15 15.001z"
                            ></path>
                        </g>
                    </svg>
                    <p className="buttonTxt desktop">View cart</p>
                    <div className="cartInfo disabled">1</div>
                </Link>
                <Link to="" className="button" id="home">
                    <svg viewBox="0 0 512 512" className="opposite blueSvg mobile">
                        <g>
                            <path
                                d="m498.195 222.695-.035-.035L289.305 13.813C280.402 4.905 268.566 0 255.977 0c-12.59 0-24.426 4.902-33.332 13.809L13.898 222.55c-.07.07-.14.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.445 13.238 31.277 13.746.48.047.965.07 1.453.07h8.324v153.7C54.832 487.254 79.578 512 110 512h81.71c8.282 0 15-6.715 15-15V376.5c0-13.879 11.29-25.168 25.169-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.285 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.16v-153.7h7.719c12.586 0 24.422-4.902 33.332-13.808 18.36-18.371 18.367-48.254.023-66.637zm0 0"
                            ></path>
                        </g>
                    </svg>
                    <p className="buttonTxt desktop">CrAzY LoGo</p>
                </Link>
                <Link to="account" className="button">
                    <svg viewBox="0 0 45.532 45.532" className="opposite blueSvg">
                        <g>
                            <path
                                d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z"
                            ></path>
                        </g>
                    </svg>
                    <p className="buttonTxt desktop">Profile</p>
                </Link>
                <hr />
                <Link to="explore" className="button">
                    <svg className="opposite blueSvg" viewBox="0 0 124 124">
                        <g>
                            <path
                                d="M112 6H12C5.4 6 0 11.4 0 18s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12zM112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12zM112 94H12c-6.6 0-12 5.4-12 12s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            ></path>
                        </g>
                    </svg>
                    <p className="buttonTxt desktop">Explore</p>
                </Link>
            </nav>
            <main>
                <Outlet />
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