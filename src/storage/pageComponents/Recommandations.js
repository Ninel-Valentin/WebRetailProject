import styles from '../style/modules/recommandations.module.css';

import { useState } from "react";
import FetchData from "../scripts/FetchData";

const Recommandations = () => {
    const [recProducts, setRecProducts] = useState([]);
    if (recProducts.length === 0)
        FetchData("https://run.mocky.io/v3/3d9829a6-3186-498f-b3de-5811c48eac4a",
            setRecProducts);

    return (
        <>
            <section className={styles.productList}>
                {
                    recProducts.map((productCard, i) => {
                        return (
                            <a className={styles.productCard}
                                key={`recommandedProductCard${i}`}
                                href={productCard.url}
                            >
                                <img
                                    // src={productCard.image}
                                    src={`https://unsplash.it/180/180?prodImg=${i}`}
                                    alt=""
                                >
                                </img>
                                <h2>{productCard.name}</h2>
                                <br />
                                <span className="price">${productCard.offers.price}</span>
                            </a>
                        )
                    })
                }
            </section>
        </>
    );
};

export default Recommandations;