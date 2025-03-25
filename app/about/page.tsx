"use client";
import "./about.css"

export default function Stuff() {

    //cssの設定方法 同じディレクトリにabout.cssがあるからそこで指定してほしい
    //設定方法はhtmlと同じ
    //htmlではclass=""だけどそれがclassName=""になったくらいで特にあとは変更はない
    //注意！nextjsは<h3>とか<h2>とかの区別がないからスタイルでfont-sizeを指定して大きさを調整してね
    //注意！css設定するときにh1とかで丸ごとの指定できないからクラス名で一括管理して(about.css見て)
    //例としてタイトル部分のスタイルを設定してみたよ

    return (
        <main className="">
            <header className="header">
                <h1 className="about">About</h1>
            </header>

            <section className="">
                <h2>翠翔祭について</h2>
                <a>翠翔祭とは毎年6月末に行われる神奈川県立横浜翠嵐高校の文化祭です。コロナの年度は一般公開できなかったものの、去年から一般公開を再開し、約１万人の方々に来場いただきました。来場お待ちしております。</a>
            </section>

            <section className="">
                <h2>2025年度全日制翠翔祭実行委員長　池田晴彦</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="">
                <h2>2025年度定時制翠翔祭実行委員長　？？？？</h2>
                <a>ありがたいお言葉</a>
            </section>

            <section className="">
                <h2 className="">翠翔祭実行委員会総務部紹介</h2>
                <h3>| 実行委員長</h3>
                <a className="member-name">　池田晴彦</a>
                <h3>| 副委員長兼会計長</h3>
                <a className="member-name">　山口理緒</a>
                <h3>| 会場長</h3>
                <a className="member-name">　深堀絢心</a>
                <h3>| 調理食販部統括責任者</h3>
                <a className="member-name">　東城英寿</a>
                <h3>| プログラム部統括責任者</h3>
                <a className="member-name">　水谷駿佑</a>
                <h3>| アーチ・広報部統括責任者</h3>
                <a className="member-name">　浅井心遙</a>
                <h3>| SP部統括責任者</h3>
                <a className="member-name">　𠮷岡太郎</a>
                <h3>| 後夜祭・ステージ部統括責任者</h3>
                <a className="member-name">　富永恵未</a>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">ウェブサイト開発</h2>
                <a className="member-name">
                    Pent &#40;横浜翠嵐所属&#41;
                </a>
            </section>


        </main>
    );
}
