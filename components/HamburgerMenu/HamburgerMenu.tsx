"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './HamburgerMenu.module.css';
import { getCookieConsent, getCookieValue, setSiteCookie } from '@/utils/cookieManager';

const SIDEBAR_COOKIE_MAX_AGE = 86400; // 例: 1日分の秒数

const HamburgerMenu: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isMapDropdownOpen, setIsMapDropdownOpen] = useState(false);
    const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

    // コンポーネントマウント時に各ドロップダウンの状態をクッキーから取得
    useEffect(() => {
        const consent = getCookieConsent();
        if (!consent) return;

        const mapVal = getCookieValue('collapsible_map');
        if (mapVal !== null) {
            setIsMapDropdownOpen(mapVal === 'true');
        }

        const eventVal = getCookieValue('collapsible_event');
        if (eventVal !== null) {
            setIsEventDropdownOpen(eventVal === 'true');
        }

        const aboutVal = getCookieValue('collapsible_about');
        if (aboutVal !== null) {
            setIsAboutDropdownOpen(aboutVal === 'true');
        }
    }, []);

    // サイドバーが開いているときは背景スクロールを無効化
    useEffect(() => {
        document.body.style.overflow = isActive ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isActive]);

    const toggleMenu = () => setIsActive(!isActive);

    // 各ドロップダウンの状態更新とクッキー保存用ハンドラー
    const handleMapDropdownChange = (value: boolean) => {
        setIsMapDropdownOpen(value);
        if (getCookieConsent()) {
            setSiteCookie('collapsible_map', value.toString(), SIDEBAR_COOKIE_MAX_AGE);
        }
    };

    const handleEventDropdownChange = (value: boolean) => {
        setIsEventDropdownOpen(value);
        if (getCookieConsent()) {
            setSiteCookie('collapsible_event', value.toString(), SIDEBAR_COOKIE_MAX_AGE);
        }
    };

    const handleAboutDropdownChange = (value: boolean) => {
        setIsAboutDropdownOpen(value);
        if (getCookieConsent()) {
            setSiteCookie('collapsible_about', value.toString(), SIDEBAR_COOKIE_MAX_AGE);
        }
    };

    // トグル用イベントハンドラー（クリック時に状態を反転）
    const toggleMapDropdown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleMapDropdownChange(!isMapDropdownOpen);
    };

    const toggleEventDropdown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleEventDropdownChange(!isEventDropdownOpen);
    };

    const toggleAboutDropdown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleAboutDropdownChange(!isAboutDropdownOpen);
    };

    return (
        <div className={styles['l-wrap']}>
            <nav className={styles['l-nav']}>
                <div className={`${styles['l-nav__main']} ${isActive ? styles['is-active'] : ''}`}>
                    <div className={styles['l-nav__mainInner']}>
                        <div className={`${styles['l-nav__left']} ${isActive ? styles['is-active'] : ''}`} onClick={toggleMenu}>
                            <Image
                                className={`${styles['pic-left']}`}
                                src="/welcome/mv_copy.webp"
                                alt="主役になろう"
                                width={594}
                                height={197}
                                loading="eager"
                            />
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
                                    <li className={styles['l-nav__itemcontent']}>
                                        <div className={styles['l-nav__item']}>
                                            <a href="/map" onClick={toggleMapDropdown}>MAP</a>
                                        </div>
                                        <ul className={`${styles['l-nav__dropdown']} ${isMapDropdownOpen ? styles['open'] : ''}`}>
                                            <li className={styles['l-nav__dropdownItem']}>
                                                <a href="/map/two">2D MAP</a>
                                            </li>
                                            <li className={styles['l-nav__dropdownItem']}>
                                                <a href="/map/three">3D MAP</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={styles['l-nav__itemcontent']}>
                                        <div className={styles['l-nav__item']}>
                                            <a href="/event" onClick={toggleEventDropdown}>EVENT</a>
                                        </div>
                                        <ul className={`${styles['l-nav__dropdown']} ${isEventDropdownOpen ? styles['open'] : ''}`}>
                                            <li className={styles['l-nav__dropdownItem']}>
                                                <a href="/event/upcoming">Upcoming Events</a>
                                            </li>
                                            <li className={styles['l-nav__dropdownItem']}>
                                                <a href="/event/past">Past Events</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/timetable">TIMETABLE</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/announce">NEWS</a>
                                    </li>
                                    <li className={styles['l-nav__item']}>
                                        <a href="/about">ABOUT</a>
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
