// pages/Home.tsx
"use client";

import React from 'react';
import Search from '@/components/search/Search';
import { normalizeString, normalizeSearchString } from '../utils/normalizeKana';
import { festivalItems, FestivalItem } from '@/utils/festival';
import { SearchIcon } from 'lucide-react';
import WelcomeCard from '@/components/WelcomeCard/WelcomeCard';
import Footer from '@/components/Footer/Footer';
import NotificationBox from '@/components/NotificationBox/NotificationBox';
import TicketAnnouncementBox from '@/components/TicketAnnouncementBox/TicketAnnouncementBox';

import styles from '@/components/Home.module.css';

// フィルタリング関数（タイトル・読みを対象にしています）
const filterFestivalItem = (item: FestivalItem, query: string): boolean => {
  const searchableText = normalizeSearchString(item.title, item.reading);
  const normalizedQuery = normalizeString(query);
  return searchableText.includes(normalizedQuery);
};

// フェスティバルアイテムのレンダリング関数（タイトルのみ表示）
const renderFestivalItem = (item: FestivalItem, index: number) => (
  <a
    key={`${item.title}-${index}`}
    href={`/event/${encodeURIComponent(item.title)}`}
    className={styles.festivalItem}
    aria-label={`詳細を見る ${item.title}`}
  >
    <div className={styles.festivalItem__container}>
      <h3 className={styles.festivalItem__title}>{item.title}</h3>
    </div>
  </a>
);

// Homeコンポーネント
const Home: React.FC = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        {/* 1段目: ようこそカード */}
        <WelcomeCard />

        {/* 検索セクション */}
        <div className={styles.searchSection}>
          {/* ラベルとアイコン */}
          <div className={styles.searchHeader}>
            <SearchIcon className={styles.searchIcon} />
            <a href='/event' className={styles.searchTitle}>イベント検索</a>
            <a href="/event" className={styles.detailedSearch}>
              詳細検索はこちら
            </a>
          </div>
          {/* 検索コンポーネント */}
          <Search<FestivalItem>
            data={festivalItems}
            filterFunction={filterFestivalItem}
            renderItem={renderFestivalItem}
            debounceTime={300}
            emptyMessage="一致する結果が見つかりませんでした。"
            placeholderMessage="検索キーワードを入力してください。"
            placeholder="検索..."
            containerClassName={styles.myCustomSearch}
            searchBarClassName={styles.myCustomSearchBar}
            searchResultsClassName={styles.myCustomSearchResults}
          />
        </div>

        {/* お知らせとアンケート */}
        <div className={styles.homeSecondaryGrid}>
          {/* 2段目: お知らせと整理券情報 */}
          <div className={styles.topRow}>
            <NotificationBox />
            <TicketAnnouncementBox />
          </div>
          {/* mapコンテンツ */}
          <div className={styles.surveyCardBox}>
            <div className={styles.surveyCard}>
              <div className={styles.surveyCardHeader}>
                <h2 className={styles.surveyTitle}>map</h2>
                <p className={styles.surveyDescription}>ここにマップ誘導コンテンツ</p>
              </div>
              <div className={styles.surveyCardContent}>
                <p className={styles.surveyText}>背景画像設定予定</p>
                <a href="/map" className={styles.surveyButton}>
                  このボタンを遷移ボタンにする予定
                </a>
              </div>
            </div>
          </div>
          {/* アンケートフォームコンテンツ */}
          <div className={styles.surveyCardBox}>
            <div className={styles.surveyCard}>
              <div className={styles.surveyCardHeader}>
                <h2 className={styles.surveyTitle}>アンケート</h2>
                <p className={styles.surveyDescription}>ご意見をお聞かせください</p>
              </div>
              <div className={styles.surveyCardContent}>
                <p className={styles.surveyText}>ここにアンケートフォームコンテンツ</p>
                <a href="/survey" className={styles.surveyButton}>
                  アンケートに回答する
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        classNames={{
          root: styles.footer,
          container: styles.footerContainer,
          address: styles.footerAddress,
          links: styles.footerLinks,
          link: styles.footerLink,
          copyright: styles.footerCopyright,
        }}
      />
    </>
  );
};

export default Home;
