import styles from '../style/modules/product.module.css';
// import FetchData from '../scripts/FetchData';
import { useEffect, useState } from 'react';

import { GetCookie, SetCookie } from '../scripts/CookieService';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProductPage = () => {

    const [pageData, setPageData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (pageData) {
            const path = window.location.pathname;
            if (!Object.keys(pageData).length || path !== pageData.path) {
                (async () => {
                    try {
                        await fetch(`http://192.168.1.5:5000/api${path}`)
                            .then((response) => response.json())
                            .then((data) => setPageData({
                                ...data.recordset.shift(),
                                path
                            }));
                    }
                    catch (err) {
                        setPageData({ error: true, message: err })
                    }
                })();
            }
        }
    }, [pageData, window.location.pathname]);


    function A2CProduct() {
        const existingCart = JSON.parse(GetCookie('cart')) || [];
        // existingCart.push(productPageData.sku);

        SetCookie('cart', JSON.stringify(existingCart));
    }

    function UpdateCartIcon() {

    }

    // Content loader functions
    function LoadBreadCrumbs() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            return (
                <>
                    <a href='/'
                        className={styles.breadCrumbsItem}>Home page</a>
                    <br className='mobile' />
                    &nbsp;&rsaquo;&nbsp;
                    <a href={`/cat/${pageData.Category.replace(/\s/g, '')}`}
                        className={styles.breadCrumbsItem}>{pageData.Category}</a>
                    <br className='mobile' />
                    &nbsp;&rsaquo;&nbsp;
                    <a href={window.location.href}
                        className={styles.breadCrumbsItem}>{pageData.Variations.find(x => x.Selected).Value}</a>
                </>
            );
        }
        // Otherwise load the loading placeholders
        else {
            return (
                <>
                    {LoadTextPlaceholder('breadCrumbsPlaceholder')}
                    <br className='mobile' />
                    &nbsp;&rsaquo;&nbsp;
                    {LoadTextPlaceholder('breadCrumbsPlaceholder')}
                    <br className='mobile' />
                    &nbsp;&rsaquo;&nbsp;
                    {LoadTextPlaceholder('breadCrumbsPlaceholder')}
                </>
            );
        }
    }

    function LoadImagePreview() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            return (<img className={`${styles.imgPreview}`}
                alt=""
                src={`/storage/images/products/${pageData.Images.find(x => x.IsPrimary).ImageUri}.png`}
            ></img>);
        }
        // Otherwise load the loading placeholders
        else {
            return (<div className={`${styles.imgPreview} ${styles.placeholderBackground}`}></div>)
        }
    }

    function LoadImages() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            let images = pageData.Images;
            return (
                <>
                    {
                        //TODO: Add selected border logic
                    }
                    {images.map((img, i) => {
                        return (
                            <img
                                className={`${styles.imgCarousellItem}${i === 0 ? ` ${styles.active}` : ''}`}
                                alt=""
                                src={`/storage/images/products/${img.ImageUri}.png`}
                                key={`imgCarousellItem_${i}`}
                                onClick={(e) => {
                                    document.querySelector('img[class*="imgPreview"]').setAttribute('src', e.target.getAttribute('src'));
                                    document.querySelectorAll('img[class*="imgCarousellItem"]').forEach(x => x.className = x.className.replace('active', '').trim())
                                    e.target.className += ` ${styles.active}`;
                                }} />
                        )
                    })}
                    <img
                        className={styles.imgCarousellItem}
                        alt={`Brand logo for ${pageData.Brand}`}
                        src={`/storage/images/brands/${pageData.Brand.replace(/\s/g, '')}.png`}
                        key={`imgCarousellItem_BrandLogo`}
                        onClick={(e) => {
                            document.querySelector('img[class*="imgPreview"]').setAttribute('src', e.target.getAttribute('src'));
                            document.querySelectorAll('img[class*="imgCarousellItem"]').forEach(x => x.className = x.className.replace('active', '').trim())
                            e.target.className += ` ${styles.active}`;
                        }} />
                </>
            )
        }
        // Otherwise load the loading placeholders
        else {
            return (
                <>
                    {[...new Array(10)].map((x, i) => {
                        return (
                            <img
                                className={`${styles.imgCarousellItem} ${styles.placeholderBackground}`}
                                alt=""
                                key={`imgCarousellItem_placeholder_${i}`} />
                        )
                    })}
                </>
            )
        }
    }

    function LoadSellerData() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            return (
                <>
                    <div className={styles.retailerInfoRow}>
                        Sold for: &nbsp;
                        <span id="value">
                            {pageData.Price}
                        </span>
                        <span id="currency">
                            {pageData["Currency Symbol"] || pageData.Currency}
                        </span>
                    </div>
                    <div className={styles.retailerInfoRow}>
                        {
                            (() => {
                                const stockState = pageData.Availability.split('/').pop();
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
                        Sold and delivered by
                        <br />
                        <span className={styles.brandHighlight}>
                            {pageData.Brand}
                        </span>
                    </div>
                </>
            );
        }
        // Otherwise load the loading placeholders
        else {
            return (
                <>
                    <div className={styles.retailerInfoRow}>
                        Sold for: &nbsp;
                        {LoadTextPlaceholder('retailerInfoPlaceholder')}
                    </div>
                    <div className={styles.retailerInfoRow}>
                        {LoadTextPlaceholder('retailerInfoPlaceholder')}
                    </div>
                    <div className={styles.retailerInfoRow}>
                        Sold and delivered by
                        <br />
                        {LoadTextPlaceholder('retailerInfoPlaceholder')}
                    </div>
                </>
            );
        }
    }

    function LoadA2CButton() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            const stockState = pageData.Availability.split('/').pop();
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
        }
        // Otherwise load the loading placeholders
        else {
            return <button disabled className={`${styles.mainButton} inactive button`}>Add To Cart</button>
        }
    }

    function LoadVariations() {
        // Check if the data has loaded
        if (Object.keys(pageData).length) {
            return (
                <>
                    <div
                        className={`${styles.customSelect} ${styles.active}`}
                        onClick={(e) => {
                            let target = e.target;
                            while (!target.className.includes(styles.customSelect))
                                target = target.parentNode;

                            target.className = `${styles.customSelect}${target.className.includes('active') ? '' : ` ${styles.active}`}`;
                            target.querySelector(`.${styles.customSelectArrow}`).innerText = target.className.includes('active') ? '▼' : '▲';
                        }}
                    >
                        <div className={styles.customSelectDisplay}>
                            <div className={styles.customSelectPlaceHolder}>{pageData.Variations.find(x => x.Selected).Name}</div>
                            <div className={styles.customSelectArrow}>▼</div>
                        </div>
                        <ul className={styles.customSelectContent}>
                            {
                                pageData.Variations.map(x => {
                                    return (
                                        <li key={x.Value}>
                                            <Link
                                                to={`/p/${x.Value}`}>
                                                {x.Name}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    {/* <select
                        className={styles.dropDown}
                        defaultValue={pageData.Variations.find(x => x.Selected).Value}
                    // onChange={
                    //     (e) => {
                    //         const sku = e.target.value;
                    //         if (!window.location.pathname.includes(sku))
                    //             navigate(`/p/${sku}`);
                    //         // should use links or smth else
                    //     }
                    // }
                    >
                        {
                            pageData.Variations.map(x => {
                                return (
                                    
                                    <option
                                        value={x.Value}
                                        key={x.Value}
                                    >
                                        <Link to={`p/${x.Value}`}>
                                            {x.Name}
                                        </Link>
                                    </option>
                                );
                            })
                        }
                    </select> */}
                </>
            );
        }
        // Otherwise load the loading placeholders
        else {
            LoadTextPlaceholder('retailerInfoPlaceholder');
        }
    }

    // function LoadImagePreview(){
    //     // Check if the data has loaded
    //     if (Object.keys(pageData).length) {
    //     }
    //     // Otherwise load the loading placeholders
    //     else {
    //     }
    // }

    function LoadTextPlaceholder(type) {
        return (
            <span className={`${styles[type]} ${styles.placeholderBackground}`}></span>
        );
    }

    console.log(pageData);
    if (pageData === undefined) {
        navigate('/404');
        return;
    } else if (pageData.error) {
        navigate('/500');
        return;
    } else {
        return (
            <>
                <Helmet>
                    <title>Web Retail Project - {Object.keys(pageData).length ? `${pageData.ProductName} - ${pageData.Variations.find(x => x.Selected).Name}` : 'loading...'}</title>
                </Helmet>
                <h3 className={`${styles.lineTitle}`}>
                    {LoadBreadCrumbs()}
                </h3>
                <h1 className={
                    `${styles.lineTitle}${Object.keys(pageData).length ? '' :
                        ` ${styles.placeholderBackground}`
                    }`}>
                    {Object.keys(pageData).length ? `${pageData.ProductName} - ${pageData.Variations.find(x => x.Selected).Name}` : ''}
                </h1>
                <div className={styles.productInfo}>
                    {LoadImagePreview()}
                    <section className={styles.imgCarousell}>
                        {LoadImages()}
                    </section>
                </div>
                <div className={styles.retailInfo}>
                    <section>
                        {LoadSellerData()}
                    </section>
                    {LoadVariations()}
                    {LoadA2CButton()}
                </div>
                <hr className={styles.detailsSeparator} />
                <h1 className={styles.lineTitle}>Product description</h1>
                <p className={styles.descriptionBox}>
                    {Object.keys(pageData).length ?
                        (
                            pageData.RenderDescription ?
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: pageData.Description
                                    }}
                                ></div>
                                : pageData.Description
                        )
                        : LoadTextPlaceholder()}
                </p>
                <hr className={styles.detailsSeparator} />
                <h1 className={styles.lineTitle}>Product reviews</h1>

            </>
        );
    }
}

export default ProductPage;