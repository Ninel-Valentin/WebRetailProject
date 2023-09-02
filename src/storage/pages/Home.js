import Banner from "../pageComponents/Banner";
import Recommandations from "../pageComponents/Recommandations";

import { useEffect, useState } from "react";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Recommandations></Recommandations>
        </>);
};

export default Home;