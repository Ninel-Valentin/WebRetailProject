import styles from '../style/modules/banner.module.css';

import { useEffect, useState } from 'react';

import FetchData from '../scripts/FetchData';

const Banner = () => {

    function SwipeImages(direction) {
        const imgContainer = document.querySelector('div[class*="bannerImgContainer"]');
        if (imgContainer) {
            const currentOffset = imgContainer.hasAttribute('style') ? +imgContainer.getAttribute('style').match(/\d+(?=vw)/).shift() : 0;
            let targetOffset = currentOffset +
                (direction === 'right' ? 100 : -100);
            // This makes the code aware of the length 
            const maxOffset = images.length > 0 ? (images.length - 1) * 100 : 100;
            targetOffset = targetOffset < 0 ? maxOffset : targetOffset;
            targetOffset = targetOffset > maxOffset ? 0 : targetOffset;

            imgContainer.setAttribute('style', `right:${targetOffset}vw !important;`)
            const targetIndex = targetOffset / 100;
            setBannerData({
                ...BannerData,
                activeIndex: targetIndex
            });
            document.querySelector('div[class*="bannerBullet"][class*="active"]').className = styles.bannerBullet;
            document.querySelector(`div[class*="bannerBullet"]:nth-child(${targetIndex + 1})`).className = `${styles.bannerBullet} ${styles.active}`;
        }
    }

    function TapToSwipeImages(e) {
        clearTimeout(BannerData.timeoutId);
        const direction = e.target.getAttribute('data-direction');
        SwipeImages(direction);
        // Don't check for this due to no time to modify. The timeout was canceled, so we can overwrite it
        // if (BannerData.timeoutId == null)
        AutoSwipeBanner();
    }

    function FinishSwipe() {
        // Get the new offset and check if it should swipe
        const imgContainer = document.querySelector('div[class*="bannerImgContainer"]');
        const currentOffset = imgContainer.hasAttribute('style') ? +imgContainer.getAttribute('style').split('- ').pop().split('px').shift() : 0;

        // Calculate 1vw
        let _1vw = Math.round(window.innerWidth / 100);

        // Check if the additional offset is higher than 35% of the screen
        let shouldSwipe = 25 * _1vw < Math.abs(currentOffset);
        let swipeDirection = currentOffset < 0 ? 'right' : 'left';

        if (shouldSwipe)
            SwipeImages(swipeDirection);
        else
            RestoreImagesState(GetOppositeDirection(swipeDirection));
        setBannerData({
            ...BannerData,
            isClicked: false,
            initialPosition: 0
        });

        if (BannerData.timeoutId == null)
            AutoSwipeBanner();
    }

    function RestoreImagesState() {
        const imgContainer = document.querySelector('div[class*="bannerImgContainer"]');
        const currentOffset = imgContainer.hasAttribute('style') ? +imgContainer.getAttribute('style').match(/\d+(?=vw)/).shift() : 0;
        let targetOffset = currentOffset;
        const maxOffset = (images.length - 1) * 100;
        targetOffset = targetOffset < 0 ? maxOffset : targetOffset;
        targetOffset = targetOffset > maxOffset ? 0 : targetOffset;

        imgContainer.setAttribute('style', `right:${targetOffset}vw !important;`)
    }

    function GetOppositeDirection(swipeDirection) {
        return swipeDirection === 'left' ? 'right' : 'left';
    }

    function HandleCursorMove(e) {
        if (BannerData.isClicked && !e.target.hasAttribute('data-direction')) {
            // Get the current offset and add the new swipe offset
            const imgContainer = document.querySelector('div[class*="bannerImgContainer"]');
            const currentOffset = imgContainer.hasAttribute('style') ? +imgContainer.getAttribute('style').split(/right:(calc\()?/).pop().split('vw').shift() : 0;

            const newOffset =
                (e.clientX || e.changedTouches[0].clientX)
                - BannerData.initialPosition;
            // Remove transition because of jitter movement
            imgContainer.setAttribute('style', `right:calc(${currentOffset}vw - ${newOffset}px); transition:none !important;`)
        }
    }

    const [images, setImages] = useState([]);
    /**
     * BannerData
     *  *   timeoutId
     *  *   isClicked
     *  *   initialPosition
     *  *   activeIndex
    */
    const [BannerData, setBannerData] = useState({
        timeoutId: null,
        isClicked: false,
        initialPosition: 0,
        activeIndex: 0
    });

    if (images.length === 0)
        FetchData("https://run.mocky.io/v3/abf244e8-515a-4c54-9fcf-8b0b2fac6601",
            setImages);

    function AutoSwipeBanner() {
        const timeoutId = setTimeout(() => {
            SwipeImages('right');
            AutoSwipeBanner();
        }, 5000);
        setBannerData({
            ...BannerData,
            isClicked: false,
            timeoutId
        })
    }

    useEffect(() => {
        if (images.length !== 0)
            AutoSwipeBanner();
        // eslint-disable-next-line
    }, [images.length]);
    // Only run this when the length changes

    return (
        <>
            <section id="banner"
                onTouchStart={(e) => {
                    if (!e.target.hasAttribute('data-direction')) {
                        clearTimeout(BannerData.timeoutId);
                        setBannerData({
                            ...BannerData,
                            timeoutId: null,
                            isClicked: true,
                            initialPosition: e.changedTouches[0].clientX
                        });
                    }
                }}
                onTouchMove={(e) => {
                    HandleCursorMove(e);
                }}
                onTouchEnd={(e) => {
                    if (!e.target.hasAttribute('data-direction'))
                        FinishSwipe();
                }}
                onTouchCancel={(e) => {
                    if (!e.target.hasAttribute('data-direction'))
                        FinishSwipe();
                }}
                onMouseDown={(e) => {
                    if (!e.target.hasAttribute('data-direction')) {
                        clearTimeout(BannerData.timeoutId);
                        setBannerData({
                            ...BannerData,
                            timeoutId: null,
                            isClicked: true,
                            initialPosition: e.clientX
                        });
                    }
                }}
                onMouseMove={(e) => {
                    HandleCursorMove(e);
                }}
                onMouseUp={(e) => {
                    if (!e.target.hasAttribute('data-direction'))
                        FinishSwipe();
                }}
                onMouseLeave={(e) => {
                    if (!e.target.hasAttribute('data-direction'))
                        FinishSwipe();
                }}
            >
                <div className={styles.bannerImgContainer}>
                    {
                        images.map((img, i) =>
                        (
                            <img src={img}
                                key={`banner-img${i}`}
                                alt=""
                            ></img>
                        ))
                    }
                </div>
                <div className={`desktop ${styles.bannerSwiperContainer}`}>
                    <div className={styles.bannerSwiper} data-direction="left" onClick={TapToSwipeImages}>←</div>
                    <div className={styles.bannerSwiper} data-direction="right" onClick={TapToSwipeImages}>→</div>
                </div>
            </section>
            <div id={styles.bannerPagination}>
                {
                    images.map((el, i) => {
                        return (
                            <div className={styles.bannerBullet
                                + (i === 0 ? ` ${styles.active}` : '')}
                                key={`banner-bullet${i}`}>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default Banner;