"use client"

import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div className={styles['l-wrap']}>
            <nav className={styles['l-nav']}>
                <div className={`${styles['l-nav__main']} ${isActive ? styles['is-active'] : ''}`}>
                    <div className={styles['l-nav__mainInner']}>
                        <div className={`${styles['l-nav__left']} ${isActive ? styles['is-active'] : ''}`}>
                            <h1 className={styles['l-nav__title']}>
                                SUIRAN<br />WEB
                            </h1>
                        </div>
                        <div className={`${styles['l-nav__right']} ${isActive ? styles['is-active'] : ''}`}>
                            <div className={styles['l-nav__rightInner']}>
                                <div className={`${styles['l-nav__rightBg']} ${styles['l-nav__rightBg-1']}`}></div>
                                <div className={`${styles['l-nav__rightBg']} ${styles['l-nav__rightBg-2']}`}></div>
                                <div className={`${styles['l-nav__rightBg']} ${styles['l-nav__rightBg-3']}`}></div>
                                <div className={`${styles['l-nav__rightBg']} ${styles['l-nav__rightBg-4']}`}></div>
                                <div className={`${styles['l-nav__rightBg']} ${styles['l-nav__rightBg-5']}`}></div>
                                <ul className={styles['l-nav__list']}>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/">TOP</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/about">ABOUT</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/event">EVENT</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/announce">NEWS</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/setting">SETTING</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/admin/login">ADMIN</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles['l-nav__button']} ${isActive ? styles['is-active'] : ''}`}
                    onClick={toggleMenu}
                >
                    <div className={styles['l-nav__buttonInner']}>
                        <span className={styles.top}></span>
                        <span className={styles.bottom}></span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HamburgerMenu;
