import React from 'react';
import Image from 'next/image';
import styles from './WelcomeCard.module.css';

const WelcomeCard: React.FC = () => {
    return (
        <div className={styles['heda']}>
            <div className={styles['bod']}>
                <div className={styles['c-wholeContainer']}>
                    <main>
                        <div className={styles['u-overflow-x-hidden']}>
                            <section className={styles['l-topMv']}>
                                <div className={styles['l-topMv__TextContentsArea']}>
                                    <div className={styles['l-topMv__TextContents']}>
                                        <div className={styles['l-topMv__ScrollAnimation']}>
                                            <div className={`${styles['c-titleAnimation']} ${styles['_vertical_']}`}>
                                                <div className={styles['c-titleAnimation__textImageInner']}>
                                                    <Image
                                                        className={`${styles['c-titleAnimation__textImage']} ${styles['_mv_']} ${styles['im']}`}
                                                        src="/welcome/title.png"
                                                        alt=""
                                                        width={500}
                                                        height={100}
                                                    />
                                                </div>
                                                <div className={styles['c-titleAnimation__textImageInner']}>
                                                    <Image
                                                        className={`${styles['c-titleAnimation__textImage']} ${styles['_mv_']} ${styles['im']}`}
                                                        src="/welcome/title.png"
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
                                                    srcSet="/welcome/logopc.png"
                                                />
                                                <Image
                                                    className={`${styles['l-topMv__Logo']} ${styles['im']}`}
                                                    src="/welcome/logosp.png"
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
                                                    srcSet="/welcome/mv_copy.webp"
                                                />
                                                <Image
                                                    className={`${styles['l-topMv__Copy']} ${styles['im']}`}
                                                    src="/welcome/mv_copy_sp.webp"
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
                                            srcSet="/welcome/rightpc.png"
                                        />
                                        <Image
                                            className={`${styles['l-topMv__CarouselImage']} ${styles['im']}`}
                                            src="/welcome/rightsp.png"
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
