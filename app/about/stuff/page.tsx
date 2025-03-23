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
                <h1 className="text-2xl">翠翔祭実行委員会</h1>
                <p></p>
            </header>

            <section className="mb-6">
                <h2>2025年度全日制翠翔祭実行委員長　池田晴彦</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="mb-6">
                <h2>2025年度定時制翠翔祭実行委員長　？？？？</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">1. 翠翔祭実行委員会総務部紹介</h2>
                <p>実行委員長　池田晴彦</p>
                <p>副委員長兼会計長　山口理緒</p>
                <p>会場長　深堀絢心</p>
                <p>調理食販部統括責任者　東城英寿</p>
                <p>プログラム部統括責任者　水谷駿佑</p> 
                <p>アーチ・広報部統括責任者　浅井心遥</p>
                <p>ＳＰ部統括責任者　𠮷岡太郎</p>
                <p>後夜祭・ステージ部統括責任者　富永恵未</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">2. ウェブサイト開発</h2>
                <p>
                    Pent &#40;横浜翠嵐所属&#41;
                </p>
            </section>

            
        </main>
    );
}
