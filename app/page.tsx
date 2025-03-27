"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "./homepage.css"
import { supabase } from '@/utils/supabase/supabase';
import { Database } from '@/types/database';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type Announcement = Database["public"]["Tables"]["announce"]["Row"];

// Homeコンポーネント
const Home: React.FC = () => {

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      const { data, error } = await supabase
        .from("announce")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching announcements:", error);
      } else {
        setAnnouncements(data ?? []);
      }
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <>
      <div className="body">
        <div className="wholeContainer">
          <main>
            <div className="overflow-x-hidden">
              <section className="topMv">
                <div className="topMv__TextContentsArea">
                  <div className="topMv__TextContents">
                    <div className="topMv__ScrollAnimation">
                      <div className="titleAnimation _vertical_">
                        <div className="titleAnimation__textImageInner">
                          <Image
                            className="titleAnimation__textImage _mv_ img"
                            src="/welcome/title.png"
                            alt=""
                            width={800}  // 適切なサイズに調整してください
                            height={200} // 適切なサイズに調整してください
                            priority
                          />
                        </div>
                        <div className="titleAnimation__textImageInner">
                          <Image
                            className="titleAnimation__textImage _mv_ img"
                            src="/welcome/title.png"
                            alt=""
                            width={800}
                            height={200}
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    <h1 className="topMv__LogoInner">
                      <picture>
                        <source
                          type="image/webp"
                          media="(min-width:768px)"
                          srcSet="/welcome/logopc.png"
                        />
                        <Image
                          className="topMv__Logo img"
                          src="/welcome/logosp.png"
                          alt=""
                          width={497}
                          height={427}
                          priority
                        />
                      </picture>
                    </h1>
                    <p className="topMv__CopyInner">
                      <picture>
                        <source
                          type="image/webp"
                          media="(min-width:768px)"
                          srcSet="/welcome/none-copy.png"
                        />
                        <Image
                          className="topMv__Copy img"
                          src="/welcome/none-copy-sp.png"
                          alt="未来をつかめ"
                          width={594}
                          height={197}
                          priority
                        />
                      </picture>
                    </p>
                  </div>
                </div>
                <div className="topMv__Carousel">
                  <picture>
                    <source
                      type="image/webp"
                      media="(min-width:768px)"
                      srcSet="/welcome/rightpc.png"
                    />
                    <Image
                      className="topMv__CarouselImage img"
                      src="/welcome/rightsp.png"
                      alt=""
                      width={750}
                      height={991}
                      priority
                    />
                  </picture>
                </div>
              </section>

              <section className="newsbox">
                <div className="newsbox__upper">
                  <picture>
                    <source
                      type="image/webp"
                      media="(min-width:768px)"
                      srcSet="/welcome/footer_mask_pc.png"
                    />
                    <Image
                      className="newsbox__upper_sp img"
                      src="/welcome/footer_mask_sp.png"
                      alt=""
                      width={2000}
                      height={500}
                      priority
                    />
                  </picture>

                  <Image
                    className="newsbox__newstag img"
                    src="/welcome/newstag.png"
                    alt=""
                    width={400}
                    height={200}
                    priority
                  />

                  <div className="newsbox__Marquee">
                    <div className="titleAnimation _share_ _reverse_">
                      <div className="titleAnimation__textImageInner">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="/welcome/title_news.png"
                          />
                          <Image
                            className="titleAnimation__textImage"
                            src="/welcome/title_news.png"
                            alt=""
                            width={2384}
                            height={150}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div className="titleAnimation__textImageInner">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="/welcome/title_news.png"
                          />
                          <Image
                            className="titleAnimation__textImage"
                            src="/welcome/title_news.png"
                            alt=""
                            width={2384}
                            height={150}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="newsbox__content">
                  <div className="news-scroll-container">
                    {loading && <p>Loading announcements...</p>}
                    {!loading && announcements.length === 0 && <p>No announcements found.</p>}
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="boxkey">
                        <div className="news-item">
                          <h3 className="news-item__title">{announcement.title}</h3>
                          <div className="news-item__row">
                            <div className="news-item__time">
                              {formatDate(announcement.created_at)}
                            </div>
                            <div className="news-item__body">
                              <p>{announcement.content}</p>
                            </div>
                          </div>
                        </div>
                        <div className="news-divider"></div>
                      </div>
                    ))}
                  </div>
                </div>

              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
