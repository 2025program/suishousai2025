// components/Search/SearchResults.tsx

"use client";

import React, { useEffect, useRef } from 'react';
import styles from './SearchResults.module.css';

interface SearchResultsProps<T> {
    items: T[];
    renderItem: (item: T, index: number, query: string) => React.ReactNode;
    emptyMessage?: string;
    placeholderMessage?: string;
    query: string;
    className?: string; // 外部からのクラス名
}

const SearchResults = <T,>({
    items,
    renderItem,
    emptyMessage = "該当する結果がありません。",
    placeholderMessage = "",
    query = "",
    className = '',
}: SearchResultsProps<T>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeElement = document.activeElement;
            const currentIndex = itemsRef.current.findIndex(item => item === activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = currentIndex < itemsRef.current.length - 1 ? currentIndex + 1 : 0;
                itemsRef.current[nextIndex]?.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : itemsRef.current.length - 1;
                itemsRef.current[prevIndex]?.focus();
            } else if (e.key === 'Enter') {
                // Enterキーで選択した項目をクリック
                e.preventDefault();
                (activeElement as HTMLElement)?.click();
            }
        };

        containerRef.current?.addEventListener('keydown', handleKeyDown);

        return () => {
            containerRef.current?.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${styles.searchResultsContainer} ${className}`}
            role="listbox"
        >
            {items.length === 0 ? (
                <div className={styles.emptyMessage}>
                    {placeholderMessage || emptyMessage}
                </div>
            ) : (
                <div className={styles.gridContainer}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            role="option"
                            tabIndex={-1}
                            className={styles.gridItem}
                            ref={(el) => { itemsRef.current[index] = el; }}
                        >
                            {renderItem(item, index, query)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
