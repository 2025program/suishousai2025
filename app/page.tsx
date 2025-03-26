import Image from 'next/image';
import React from 'react';
import "./homepage.css"

// Homeコンポーネント
const Home: React.FC = () => {
  return (
    <>
      <div className="body">
        <div className="c-wholeContainer">
          <main>
            <div className="u-overflow-x-hidden">
              <section className="l-topMv">
                <div className="l-topMv__TextContentsArea">
                  <div className="l-topMv__TextContents">
                    <div className="l-topMv__ScrollAnimation">
                      <div className="c-titleAnimation _vertical_">
                        <div className="c-titleAnimation__textImageInner">
                          <Image
                            className="c-titleAnimation__textImage _mv_ img"
                            src="/welcome/title.png"
                            alt=""
                            width={800}  // 適切なサイズに調整してください
                            height={200} // 適切なサイズに調整してください
                            priority
                          />
                        </div>
                        <div className="c-titleAnimation__textImageInner">
                          <Image
                            className="c-titleAnimation__textImage _mv_ img"
                            src="/welcome/title.png"
                            alt=""
                            width={800}
                            height={200}
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    <h1 className="l-topMv__LogoInner">
                      <picture>
                        <source
                          type="image/webp"
                          media="(min-width:768px)"
                          srcSet="/welcome/logopc.png"
                        />
                        <Image
                          className="l-topMv__Logo img"
                          src="/welcome/logosp.png"
                          alt=""
                          width={497}
                          height={427}
                          priority
                        />
                      </picture>
                    </h1>
                    <p className="l-topMv__CopyInner">
                      <picture>
                        <source
                          type="image/webp"
                          media="(min-width:768px)"
                          srcSet="/welcome/mv_copy.webp"
                        />
                        <Image
                          className="l-topMv__Copy img"
                          src="/welcome/mv_copy_sp.webp"
                          alt="主役になろう"
                          width={594}
                          height={197}
                          priority
                        />
                      </picture>
                    </p>
                  </div>
                </div>
                <div className="l-topMv__Carousel">
                  <picture>
                    <source
                      type="image/webp"
                      media="(min-width:768px)"
                      srcSet="/welcome/rightpc.png"
                    />
                    <Image
                      className="l-topMv__CarouselImage img"
                      src="/welcome/rightsp.png"
                      alt=""
                      width={750}
                      height={991}
                      priority
                    />
                  </picture>
                </div>
              </section>
              <footer className="l-footer">
                <div className="l-footer__upper">
                  <picture>
                    <source
                      type="image/webp"
                      media="(min-width:768px)"
                      srcSet="/welcome/footer_mask_pc.png"
                    />
                    <Image
                      className="l-footer__upper_sp img"
                      src="/welcome/footer_mask_pc.png" //別途sp用の画像もあるのでそっちに変更も可能
                      alt=""
                      width={2000}
                      height={200}
                      priority
                    />
                  </picture>

                  <Image
                    className="l-footer__newstag img"
                    src="/welcome/newstag.png"
                    alt=""
                    width={400}
                    height={200}
                    priority
                  />

                  <div className="l-footer__Marquee">
                    <div className="c-titleAnimation _share_ _reverse_">
                      <div className="c-titleAnimation__textImageInner">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="/welcome/title_share.png"
                          />
                          <Image
                            className="c-titleAnimation__textImage"
                            src="/welcome/title_share.png"
                            alt=""
                            width={2384}
                            height={150}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div className="c-titleAnimation__textImageInner">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="/welcome/title_share.png"
                          />
                          <Image
                            className="c-titleAnimation__textImage"
                            src="/welcome/title_share.png"
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
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
