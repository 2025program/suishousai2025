// components/Search/Search.tsx

"use client";

import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './Search.module.css';

interface SearchProps<T> {
    data: T[];
    filterFunction: (item: T, query: string) => boolean;
    renderItem: (item: T, index: number, query: string) => React.ReactNode;
    debounceTime?: number;
    emptyMessage?: string;
    placeholderMessage?: string;
    placeholder?: string;
    containerClassName?: string; // コンテナ用クラス名
    searchBarClassName?: string; // SearchBar用クラス名
    searchResultsClassName?: string; // SearchResults用クラス名
}

const Search = <T,>({
    data,
    filterFunction,
    renderItem,
    debounceTime = 300,
    emptyMessage = "一致する結果が見つかりませんでした。",
    placeholderMessage = "検索キーワードを入力してください。",
    placeholder = "検索...",
    containerClassName = '',
    searchBarClassName = '',
    searchResultsClassName = '',
}: SearchProps<T>) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');

    // デバウンスの設定
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, debounceTime]);

    // 検索クリアのハンドリング
    const handleClearSearch = () => {
        setSearchQuery('');
        setDebouncedQuery('');
    };

    // フィルタリング
    const filteredItems = useMemo(() => {
        if (debouncedQuery.trim() === '') return [];
        return data.filter(item => filterFunction(item, debouncedQuery));
    }, [debouncedQuery, data, filterFunction]);

    return (
        <div className={`${styles.myCustomSearch} ${containerClassName}`}>
            {/* 検索ボックス */}
            <SearchBar
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onClear={handleClearSearch}
                placeholder={placeholder}
                className={styles.myCustomSearchBar}
            />

            {/* 検索結果 */}
            <SearchResults
                items={debouncedQuery.trim() === '' ? [] : filteredItems}
                renderItem={(item, index) => renderItem(item, index, debouncedQuery)}
                emptyMessage={emptyMessage}
                placeholderMessage={placeholderMessage}
                query={debouncedQuery}
                className={styles.myCustomSearchResults}
            />
        </div>
    );
};

export default Search;
