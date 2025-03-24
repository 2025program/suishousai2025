import React from 'react';
import Image from 'next/image';
import styles from './WelcomeCard.module.css';

const WelcomeCard: React.FC = () => {
    return (
        <div className={styles['heda']}>
            <div className={styles['bod']}>
                <div className={styles['c-wholeContainer']}>
                    <main>
                        <div className={styles['l-top__svgPath']}>
                            <svg width="0" height="0" className={styles['sv']}>
                                <defs>
                                    <clipPath id="myClip" clipPathUnits="objectBoundingBox">
                                        <path
                                            transform="scale(0.00052083, 0.002)"
                                            d="m0,500V0s1294.5,127.19,1920,484v16H0Z"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg width="0" height="0" className={styles['sv']}>
                                <defs>
                                    <clipPath id="myClipHistory" clipPathUnits="objectBoundingBox">
                                        <path
                                            transform="scale(0.00052083, 0.0025641)"
                                            d="m0,390h1920V0S674,15.11,0,311.56v78.44Z"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg width="0" height="0" className={styles['sv']}>
                                <defs>
                                    <clipPath id="myClipOverview" clipPathUnits="objectBoundingBox">
                                        <path
                                            transform="scale(0.00052083, 0.0021041)"
                                            d="m0,487h1920V0S1229,343.02,0,205.81v281.19Z"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg width="0" height="0" className={styles['sv']}>
                                <defs>
                                    <clipPath id="myClipOverviewSp" clipPathUnits="objectBoundingBox">
                                        <path
                                            transform="scale(0.00142083, 0.0031681)"
                                            d="m0,314h750V0S292,44,0,203.67v110.33Z"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={styles['u-overflow-x-hidden']}>
                            <section className={styles['l-topMv']}>
                                <div className={styles['l-topMv__TextContentsArea']}>
                                    <div className={styles['l-topMv__TextContents']}>
                                        <div className={styles['l-topMv__ScrollAnimation']}>
                                            <div className={`${styles['c-titleAnimation']} ${styles['_vertical_']}`}>
                                                <div className={styles['c-titleAnimation__textImageInner']}>
                                                    <Image
                                                        className={`${styles['c-titleAnimation__textImage']} ${styles['_mv_']} ${styles['im']}`}
                                                        src="/title.png"
                                                        alt=""
                                                        width={500}
                                                        height={100}
                                                    />
                                                </div>
                                                <div className={styles['c-titleAnimation__textImageInner']}>
                                                    <Image
                                                        className={`${styles['c-titleAnimation__textImage']} ${styles['_mv_']} ${styles['im']}`}
                                                        src="/title.png"
                                                        alt=""
                                                        width={500}
                                                        height={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className={styles['l-topMv__LogoInner']}>
                                            <picture>
                                                <source
                                                    type="image/webp"
                                                    media="(min-width:768px)"
                                                    srcSet="/logopc.png"
                                                />
                                                <Image
                                                    className={`${styles['l-topMv__Logo']} ${styles['im']}`}
                                                    src="/logosp.png"
                                                    alt="右画像"
                                                    width={497}
                                                    height={427}
                                                    loading="eager"
                                                />
                                            </picture>
                                        </h1>
                                        <p className={styles['l-topMv__CopyInner']}>
                                            <picture>
                                                <source
                                                    type="image/webp"
                                                    media="(min-width:768px)"
                                                    srcSet="/mv_copy.webp"
                                                />
                                                <Image
                                                    className={`${styles['l-topMv__Copy']} ${styles['im']}`}
                                                    src="/mv_copy_sp.webp"
                                                    alt="主役になろう"
                                                    width={594}
                                                    height={197}
                                                    loading="eager"
                                                />
                                            </picture>
                                        </p>
                                    </div>
                                </div>
                                <div className={styles['l-topMv__Carousel']}>
                                    <picture>
                                        <source
                                            type="image/webp"
                                            media="(min-width:768px)"
                                            srcSet="/rightpc.png"
                                        />
                                        <Image
                                            className={`${styles['l-topMv__CarouselImage']} ${styles['im']}`}
                                            src="/rightsp.png"
                                            alt=""
                                            width={750}
                                            height={991}
                                            loading="eager"
                                        />
                                    </picture>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default WelcomeCard;
