"use client"
import React, { useEffect, useCallback } from 'react';
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";

const Attention: React.FC = () => {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "注意事項", href: "/attention" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <main className="p-8">
            <header className="mb-6">
                <h1 className="text-2xl">注意事項</h1>
            </header>

            <section className="mb-6">
                <h2 className="text-xl mb-2">1. はじめに</h2>
                <p>
                    以下の注意事項に反した場合は、相応の対応を取らせていただきます。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">2. 入退場</h2>
                <p>
                    基本的に自由となっていますが、門前での待ち合わせや待機は通行の妨げとなる場合があるのでご遠慮ください。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">3. 設備、物品管理、盗難対策</h2>
                <p>
                    学校の備品や設備は大切に扱ってください。自身の荷物は自己管理をお願いします。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">4. 騒音、迷惑行為</h2>
                <p>
                    他の来場者に迷惑となる行為はお控えください。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">5. 飲食</h2>
                <p>
                    校内での飲食は自由ですが、ゴミは各自で処理をお願いします。用意されているゴミ箱もご活用ください。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">6. 盗撮や撮影禁止エリアでの撮影</h2>
                <p>
                    盗撮は禁止です。また、撮影禁止エリアでの撮影もお控えください。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">7. 展示物などの破壊</h2>
                <p>
                    故意でなくとも展示物などを破壊してしまった場合は、本部までご連絡ください。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">8. 緊急事態の対応</h2>
                <p>
                    学校の放送や指示に従ってください。
                </p>
            </section>

            <section>
                <h2 className="text-xl mb-2">9. その他注意事項</h2>
                <p>
                    校内は禁煙です。
                </p>
            </section>
        </main>
    );
};

export default Attention;
