// components/NotificationItem/NotificationItem.tsx
"use client";

import React from 'react';
import { Announcement } from '@/types/announcements';
import { FaBell } from 'react-icons/fa';
import styles from './NotificationItem.module.css';

interface NotificationItemProps {
    announcement: Announcement;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ announcement }) => {
    const { date, headline, title, content, details, link } = announcement;

    // 主要なプロパティがすべてない場合は何も表示しない
    if (!date && !headline && !title && !content && !details && !link) {
        return null;
    }

    return (
        <div className={styles.notificationItem}>
            <FaBell className={styles.icon} />
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.headline}>{headline}</span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{content}</p>
                {details && (
                    <a href={link} className={styles.details}>
                        {details} &rarr;
                    </a>
                )}
            </div>
        </div>
    );
};

export default NotificationItem;
