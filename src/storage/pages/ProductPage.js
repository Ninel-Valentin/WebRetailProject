import styles from '../style/modules/product.module.css';
import FetchData from '../scripts/FetchData';
import { useState } from 'react';

import { GetCookie, SetCookie } from '../scripts/CookieService';

const ProductPage = () => {
    // const domain = window.location.host;
    // const productSku = window.location.href.match(/(?<=\/p\/)[A-Z0-9]*?(?=\?|$)/g).shift();
    // const thisPage = `http://${domain}/p/${productSku}`
    // const pageState = {
    //     "product-sku": productSku
    // }
    // window.history.pushState(pageState, "", thisPage);
    const thisPage = window.location.href;

    const productPageData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "brand": "TruWave",
        "name": "Running Shoes",
        "description": "Enhance your running experience with our high-performance Running Shoes.",
        "category": "Sports & Outdoors",
        "sku": "JKL567890",
        "url": "https://www.product.com/JKL567890",
        "image": "/storage/images/Sports&Outdoors_4.png",
        "images": [
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png",
            "/storage/images/Sports&Outdoors_4.png"
        ],
        "offers": {
            "@type": "Offer",
            "price": "79.99",
            "currencySymbol": "$",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };
    // const [productPageData, setPageData] = useState({});
    // FetchData("https://run.mocky.io/v3/8bf72c02-5929-46dd-bdef-53c24e81c338"
    //     , setPageData);

    function A2CProduct() {
        const existingCart = JSON.parse(GetCookie('cart')) || [];
        existingCart.push(productPageData.sku);

        SetCookie('cart', JSON.stringify(existingCart));
    }

    function UpdateCartIcon() {

    }

    return (
        <>
            <h3 className={`${styles.lineTitle}`}>
                <a href='/'
                    className={styles.breadCrumbsItem}>Home page</a>
                <br className='mobile' />
                &nbsp;&rsaquo;&nbsp;
                <a href={`/cat/${productPageData.category.replace(/\s/g, '')}`}
                    className={styles.breadCrumbsItem}>{productPageData.category}</a>
                <br className='mobile' />
                &nbsp;&rsaquo;&nbsp;
                <a href={thisPage}
                    className={styles.breadCrumbsItem}>{productPageData.name}</a>
            </h3>
            <h1 className={styles.lineTitle}>{productPageData.name}</h1>
            <div className={styles.productInfo}>
                {/* // TODO: add zoom preview effect */}
                <img className={styles.imgPreview}
                // src={productPageData.image}
                ></img>
                <section className={styles.imgCarousell}>
                    {
                        productPageData.images.map((img, i) => {
                            return (
                                <img
                                    className={styles.imgCarousellItem}
                                    key={`imgCarousellItem_${i}`}
                                    onClick={(e) => {
                                        // TODO: Check the functionality of the switch
                                        document.querySelector(styles.imgPreview).setAttribute('src', e.target.getAttribute('src'));
                                    }}
                                // src={productPageData.img}
                                ></img>
                            );
                        })
                    }
                </section>
            </div>
            <div className={styles.retailInfo}>
                <section>
                    <div className={styles.retailerInfoRow}>
                        Sold for: &nbsp;
                        <span id="currency">{
                            productPageData.offers.currencySymbol ||
                            productPageData.offers.priceCurrency}
                        </span>
                        <span id="value">{productPageData.offers.price}</span>
                    </div>
                    <div className={styles.retailerInfoRow}>
                        {
                            (() => {
                                const stockState = productPageData.offers.availability.split('/').pop();
                                switch (stockState) {
                                    case 'InStock':
                                        return (<p style={{ color: 'green' }}>✔ In stock</p>);
                                    case 'OutOfStock':
                                        return (<p style={{ color: 'red' }}>✖ Product no longer in stock</p>);
                                    case 'Discontinued':
                                        return (<p style={{ color: 'purple' }}>❕ Product discontinued. ❕<br /> This product is no longer manufactured.</p>);
                                    default:
                                        return null;
                                }
                            })()
                        }
                    </div>
                    <div className={styles.retailerInfoRow}>
                        Sold and delivered by <span className={styles.brandHighlight}>{productPageData.brand}</span>
                    </div>
                </section>
                {
                    (() => {
                        const stockState = productPageData.offers.availability.split('/').pop();
                        switch (stockState) {
                            case 'InStock':
                                return <button
                                    className={`${styles.mainButton} button`}
                                    onClick={(e) => {
                                        A2CProduct();
                                        UpdateCartIcon();
                                    }}
                                >
                                    Add To Cart
                                </button>
                            case 'OutOfStock':
                                return <button className={`${styles.mainButton} button`}>Notify me when in stock</button>
                            case 'Discontinued':
                                return <button disabled className={`${styles.mainButton} disabled button`}>Add To Cart</button>
                            default:
                                return null;
                        }
                    })()
                }
            </div>
            <hr className={styles.detailsSeparator} />
            <h1 className={styles.lineTitle}>Product description</h1>
            <p className={styles.descriptionBox}>{productPageData.description}</p>
        </>
    );
}

export default ProductPage;