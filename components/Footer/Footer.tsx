// Footer.tsx
import React from 'react';
import Link from 'next/link'; // Next.js を使用している場合

type FooterClassNames = {
    root?: string;
    container?: string;
    address?: string;
    links?: string;
    link?: string;
    copyright?: string;
};

type FooterProps = {
    classNames?: FooterClassNames; // クラス名オブジェクトを受け取る
};

const Footer: React.FC<FooterProps> = ({ classNames = {} }) => {
    return (
        <footer className={classNames.root}>
            <div className={classNames.container}>
                {/* 住所情報 */}
                <div className={classNames.address}>
                    <p>〒221-0854 横浜市神奈川区三ツ沢南町1-1</p>
                    <p>神奈川県立横浜翠嵐高等学校</p>
                </div>

                {/* ナビゲーションリンク */}
                <div className={classNames.links}>
                    <Link href="/attention" className={classNames.link}>
                        注意事項
                    </Link>
                    <Link href="/setting/privacy" className={classNames.link}>
                        プライバシーポリシー
                    </Link>
                </div>
            </div>

            {/* 著作権情報 */}
            <div className={classNames.copyright}>
                &copy; {new Date().getFullYear()} 神奈川県立横浜翠嵐高等学校. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
