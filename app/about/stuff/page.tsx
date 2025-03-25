"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";

export default function Stuff() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "概要", href: "/about" }, { name: "スタッフ", href: "/about/stuff" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <main className="p-8">
            <header className="mb-6">
                <h1 className="text-2xl">About</h1>
                <p></p>
            </header>

            <section　className="mb-6">
                <h2>翠翔祭について</h2>
                <a>翠翔祭とは毎年6月末に行われる神奈川県立横浜翠嵐高校の文化祭です。コロナの年度は一般公開できなかったものの、去年から一般公開を再開し、約１万人の方々に来場いただきました。ぜひともご来場お願いします。</a>
            </section>

            <section className="mb-6">
                <h2>2025年度全日制翠翔祭実行委員長　池田晴彦</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="mb-6">
                <h2>2025年度定時制翠翔祭実行委員長　？？？？</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">翠翔祭実行委員会総務部紹介</h2>
                <h3>| 実行委員長</h3>
                <a>　池田晴彦</a>
                <h3>| 副委員長兼会計長</h3>
                <a>　山口理緒</a>
                <h3>| 会場長</h3>
                <a>　深堀絢心</a>
                <h3>| 調理食販部統括責任者</h3>
                <a>　東城英寿</a>
                <h3>| プログラム部統括責任者</h3>
                <a>　水谷駿佑</a>
                <h3>| アーチ・広報部統括責任者</h3>
                <a>　浅井心遙</a>
                <h3>| SP部統括責任者</h3>
                <a>　𠮷岡太郎</a>
                <h3>| 後夜祭・ステージ部統括責任者</h3>
                <a>　富永恵未</a>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">ウェブサイト開発</h2>
                <p>
                    Pent &#40;横浜翠嵐所属&#41;
                </p>
            </section>

            
        </main>
    );
}
