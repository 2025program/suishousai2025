'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import TicketItem, { TicketAnnouncement } from './TicketItem';
import styles from './TicketAnnouncementBox.module.css';
import { FaTicketAlt } from 'react-icons/fa';

const TicketAnnouncementBox: React.FC = () => {
    const [tickets, setTickets] = useState<TicketAnnouncement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTickets() {
            const { data, error } = await supabase
                .from('status')
                .select('id, name, ticket')
                .eq('numbered', true)
                .order('id', { ascending: true });
            if (error) {
                console.error('Error fetching ticket announcements:', error);
            } else if (data) {
                setTickets(data as TicketAnnouncement[]);
            }
            setLoading(false);
        }
        fetchTickets();
    }, []);

    return (
        <div className={styles.ticketBox}>
            <div className={styles.header}>
                <FaTicketAlt className={styles.headerIcon} />
                <h2 className={styles.title}>整理券情報</h2>
            </div>
            {loading && <p>Loading ticket info...</p>}
            {!loading && tickets.length === 0 && (
                <p className={styles.emptyMessage}>整理券情報はありません。</p>
            )}
            <div className={styles.list}>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default TicketAnnouncementBox;
