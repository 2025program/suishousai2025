// components/Search/SearchBar.tsx

"use client";

import React, { ChangeEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import styles from './SearchBar.module.css';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    placeholder?: string;
    className?: string; // 外部からのクラス名
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear, placeholder = "検索...", className = '' }) => {
    return (
        <div className={`${styles.searchBarContainer} ${className}`}>
            <div className={styles.searchIcon}>
                <SearchIcon />
            </div>
            <input
                id="search"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.searchInput}
                aria-label="検索"
            />
            {value && (
                <button
                    onClick={onClear}
                    className={styles.clearButton}
                    aria-label="検索をクリア"
                    tabIndex={0}
                >
                    <XMarkIcon className={styles.clearIcon} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
