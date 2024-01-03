import styles from '../style/modules/product.module.css';
// import FetchData from '../scripts/FetchData';
import { useEffect, useState } from 'react';

import { ReactComponent as FullStar } from '../svg/full_star.svg';
import { ReactComponent as HalfStar } from '../svg/half_star.svg';
import { ReactComponent as EmptyStar } from '../svg/empty_star.svg';

import { GetCookie, SetCookie } from '../scripts/CookieService';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const textToStar = {
    full: <FullStar></FullStar>,
    half: <HalfStar></HalfStar>,
    empty: <EmptyStar></EmptyStar>
};

const ProductPage = () => {

    const [pageData, setPageData] = useState({});
    const [reviewsData, setReviewsData] = useState({});
    const [reviewInputData, setReviewInputData] = useState({ hover: false, score: 0, values: new Array(5).fill('empty') });
    const navigate = useNavigate();

    useEffect(() => {
        if (pageData) {
            const path = window.location.pathname;
            if (!Object.keys(pageData).length || path !== pageData.path) {
                (async () => {
                    try {
                        const domain = window.location.origin.replace(/:\d+/g, '');
                        await fetch(`${domain}:5000/api${path}`)
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

    useEffect(() => {
        if (reviewsData && pageData) {
            const path = window.location.pathname;
            if (!Object.keys(reviewsData).length || path !== pageData.path) {
                (async () => {
                    try {
                        const domain = window.location.origin.replace(/:\d+/g, '');
                        await fetch(`${domain}:5000/api${path}/reviews`)
                            .then((response) => response.json())
                            .then((data) => setReviewsData({
                                ...data.recordset.shift()
                            }));
                    }
                    catch (err) {
                        setReviewsData({ error: true, message: err })
                    }
                })();


            }
        }
    }, [reviewsData, window.location.pathname]);


    function A2CProduct() {
        const existingCart = JSON.parse(GetCookie('cart')) || [];
        existingCart.push(pageData.Variations.find(x => x.Selected).Value);

        SetCookie('cart', JSON.stringify(existingCart));
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

    function LoadDescription() {
        return Object.keys(pageData).length ?
            (
                pageData.RenderDescription ?
                    <div
                        dangerouslySetInnerHTML={{
                            __html: pageData.Description
                        }}
                    ></div>
                    : pageData.Description
            )
            : LoadTextPlaceholder()
    }

    function LoadReviewInputBox() {
        return (
            <section>
                <div className={styles.ratingSummary} id="RatingSummary">
                    <section className={styles.ratingSummaryHeader}>
                        <h3>Average: {reviewsData.AverageRatingScore} / 5 </h3>
                        {LoadReviewStars()}
                    </section>
                    <hr />
                    <section className={styles.ratingSummaryBody}>
                        <h6> You can leave your opinion here: </h6>
                        <form>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="RatingSourceValue"> Score: </label>
                                        </td>
                                        <td>
                                            <input required readOnly hidden id="RatingSourceValue" name="RatingSourceValue" type="number" min="0" max="5" step=".5" value={reviewInputData.score}></input>
                                            <div
                                                onMouseEnter={() => {
                                                    setReviewInputData({
                                                        ...reviewInputData,
                                                        hover: true
                                                    });
                                                }}
                                                onMouseLeave={() => {
                                                    setReviewInputData({
                                                        ...reviewInputData,
                                                        hover: false,
                                                        values: [
                                                            ...new Array(Math.floor(reviewInputData.score)).fill('full'),
                                                            (Math.floor(reviewInputData.score) === reviewInputData.score ? null : 'half'),
                                                            ...new Array(5 - Math.ceil(reviewInputData.score)).fill('empty'),
                                                        ].filter(x => x)
                                                    });
                                                }}
                                                className={styles.ratingInputWrapper}>
                                                {
                                                    reviewInputData.values.map((reviewInputValue, reviewInputIndex) =>
                                                        <div
                                                            key={`reviewInput-${reviewInputIndex}`}
                                                            onMouseMove={(e) => {
                                                                let divParent = e.target.parentNode;
                                                                divParent = divParent.nodeName === 'DIV' ? divParent : divParent.parentNode.parentNode;

                                                                const index = [...divParent.parentNode.childNodes].indexOf(divParent);

                                                                const newReviewInputData = {
                                                                    ...reviewInputData,
                                                                    values: reviewInputData.values.map((x, i) =>
                                                                        (i > index ? 'empty' : (i < index ? 'full' : x))
                                                                    ),
                                                                    hover: true
                                                                };

                                                                const rect = e.target.getBoundingClientRect();
                                                                const mouseX = e.clientX - rect.left;
                                                                const containerWidth = rect.width;

                                                                if (mouseX < containerWidth / 2) {
                                                                    // left half

                                                                    newReviewInputData.values = newReviewInputData.values.map((x, i) =>
                                                                        (i === index ? 'half' : x)
                                                                    );
                                                                } else {
                                                                    // right half

                                                                    newReviewInputData.values = newReviewInputData.values.map((x, i) =>
                                                                        (i === index ? 'full' : x)
                                                                    );
                                                                }
                                                                // Compare if anything changed
                                                                if (reviewInputData.hover !== newReviewInputData.hover ||
                                                                    reviewInputData.values.filter((x, i) => newReviewInputData.values[i] !== x).length)
                                                                    setReviewInputData(newReviewInputData);
                                                            }}
                                                            onClick={(e) => {
                                                                let divParent = e.target.parentNode;
                                                                divParent = divParent.nodeName === 'DIV' ? divParent : divParent.parentNode.parentNode;

                                                                let score = [...divParent.parentNode.childNodes].indexOf(divParent);

                                                                const rect = e.target.getBoundingClientRect();
                                                                const mouseX = e.clientX - rect.left;
                                                                const containerWidth = rect.width;

                                                                if (mouseX < containerWidth / 2) {
                                                                    score += .5;
                                                                } else {
                                                                    score++;
                                                                }

                                                                setReviewInputData({
                                                                    ...reviewInputData,
                                                                    score
                                                                });
                                                            }}
                                                            className={styles.ratingInput}>
                                                            {textToStar[reviewInputValue]}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="ReviewTitle"> Title: </label>
                                        </td>
                                        <td>
                                            <input required max="50" type="text" id="ReviewTitle" name="ReviewTitle"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="ReviewBody"> Review: </label>
                                        </td>
                                        <td>
                                            <textarea required max="255" type="text" id="ReviewBody" name="ReviewBody"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <input type="submit"></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </section>
                </div>
            </section >
        )
    }

    function LoadReviewStars() {
        return (
            <div className={styles.averageDisplay}>
                {Object.keys(reviewsData).length ?
                    (
                        [
                            ...new Array(Math.floor(reviewsData.AverageRatingScore)).fill(undefined).map((x, i) => {
                                return <FullStar key={`FullStar_${i}`}></FullStar>;
                            }),
                            (reviewsData === Math.floor(reviewsData.AverageRatingScore) ? null : <HalfStar key="HalfStar"></HalfStar>),
                            ...new Array(5 - Math.ceil(reviewsData.AverageRatingScore)).fill(undefined).map((x, i) => {
                                return <EmptyStar key={`EmptyStar_${i}`}></EmptyStar>;
                            })

                        ] //.filter(x => x) // Used to remove the null
                    )
                    : LoadTextPlaceholder()}
            </div>
        );
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
                    <h3 className={styles.reviewSummaryText}>
                        <a href="#RatingSummary"> Leave a review </a>: {reviewsData.AverageRatingScore} / 5
                        {LoadReviewStars()}
                    </h3>
                    <section>
                        {LoadSellerData()}
                    </section>
                    {LoadVariations()}
                    {LoadA2CButton()}
                </div>
                <hr className={styles.detailsSeparator} />
                <h1 className={styles.lineTitle}>Product description</h1>
                <div className={styles.contentBox}>
                    {LoadDescription()}
                </div>
                <hr className={styles.detailsSeparator} />
                <h1 className={styles.lineTitle}>Product reviews</h1>
                <div className={styles.contentBox}>
                    {LoadReviewInputBox()}
                </div >

            </>
        );
    }
}

export default ProductPage;