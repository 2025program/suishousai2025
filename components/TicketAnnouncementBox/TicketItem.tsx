'use client';
import React from 'react';
import Link from 'next/link';
import { FaTicketAlt } from 'react-icons/fa';
import styles from './TicketItem.module.css';

export type TicketAnnouncement = {
    id: number;
    name: string;
    ticket: string;
};

interface TicketItemProps {
    ticket: TicketAnnouncement;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    return (
        <div className={styles.ticketItem}>
            <div className={styles.row}>
                <FaTicketAlt className={styles.ticketIcon} />
                <span className={styles.ticketName}>{ticket.name}</span>
            </div>
            <p className={styles.ticketText}>{ticket.ticket}</p>
            <div className={styles.linkWrapper}>
                <Link href={`/event/${encodeURIComponent(ticket.name)}`}>
                    <div className={styles.detailLink}>詳細情報 &rarr;</div>
                </Link>
            </div>
        </div>
    );
};

export default TicketItem;
