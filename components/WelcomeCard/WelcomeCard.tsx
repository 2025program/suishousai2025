// WelcomeCard.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Roboto_Slab, Pacifico } from 'next/font/google';
import styles from './WelcomeCard.module.css';

const roboto = Roboto_Slab({
    weight: '600',
    subsets: ['latin'],
});

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});

const imageList = [
    '/picture/suiran1.jpg',
    '/picture/suiran2.jpg',
    '/picture/suiran3.jpg',
    // 必要に応じて追加の画像パスをここに
];

const WelcomeCard: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5秒ごとにスライド

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.root}>
            <div className={styles.background}>
                {imageList.map((src, index) => (
                    <div
                        key={index}
                        className={`${styles.imageWrapper} ${index === currentIndex ? styles.active : ''}`}
                    >
                        <Image
                            src={src}
                            alt={`学校の文化祭の背景画像 ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            quality={80}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* 中央に配置する斜め帯 */}
            <div className={styles.decorativeBand}></div>

            <div className={styles.content}>
                <h1 className={`${styles.title} ${pacifico.className}`}>Welcome</h1>
                <p className={`${styles.description}`}>
                    2025年。新たに創り出す翠翔祭。
                </p>
            </div>

            {/* ナビゲーションボタン */}
            <button
                className={`${styles.navButton} ${styles.prev}`}
                onClick={handlePrev}
                aria-label="前のスライドへ"
            >
                &#10094;
            </button>
            <button
                className={`${styles.navButton} ${styles.next}`}
                onClick={handleNext}
                aria-label="次のスライドへ"
            >
                &#10095;
            </button>

            {/* ドットインジケーター */}
            <div className={styles.indicators}>
                {imageList.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => handleIndicatorClick(index)}
                        aria-label={`スライド ${index + 1}`}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleIndicatorClick(index);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default WelcomeCard;
