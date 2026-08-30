'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Radio, RotateCcw, Volume2, VolumeX } from 'lucide-react';

type Phase = 'static' | 'broadcast' | 'reveal';

const revealWallys = ['0271', '0964', '0014', '0233', '0590'];

export function BroadcastIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('static');
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [mediaFailed, setMediaFailed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const timer = window.setTimeout(
      () => setPhase(reducedMotion ? 'reveal' : 'broadcast'),
      reducedMotion ? 100 : 1150,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'broadcast' || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = muted;
    void video.play().catch(() => {
      setPlaying(false);
    });
  }, [muted, phase]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setPlaying(true));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (video.paused) void video.play().then(() => setPlaying(true));
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setPhase('broadcast');
    setPlaying(true);
    void video.play();
  };

  const reveal = () => {
    videoRef.current?.pause();
    setPlaying(false);
    setPhase('reveal');
  };

  return (
    <section
      className={`broadcast-hero phase-${phase}`}
      aria-labelledby="hero-title"
    >
      <div className="broadcast-masthead">
        <span>WALLY WORLD SERVICE</span>
        <i aria-hidden="true" />
        <span>THE RWA REPORT</span>
        <i aria-hidden="true" />
        <span>TRANSMISSION № 001</span>
      </div>

      <div className="broadcast-layout">
        <div className="broadcast-copy">
          <p className="broadcast-eyebrow">
            <Radio aria-hidden="true" /> A SPECIAL TELEVISION BULLETIN
          </p>
          <h1 id="hero-title">
            The real world is <em>coming onchain.</em>
          </h1>
          <p className="broadcast-deck">
            Tonight: one elephant, one thousand leaders, and a mission to make
            real-world markets fair, open, and useful for everyone.
          </p>
          <a className="broadcast-story-link" href="#story">
            Read the full report <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="television-wrap">
          <div
            className="television"
            aria-label="Wally World Service television"
          >
            <div className="tv-case">
              <div className="tv-screen-bezel">
                <div className="tv-screen">
                  <video
                    ref={videoRef}
                    className="broadcast-video"
                    muted={muted}
                    playsInline
                    preload="auto"
                    aria-label="Wally World Service opening broadcast"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={reveal}
                    onError={() => {
                      setMediaFailed(true);
                      setPhase('reveal');
                    }}
                  >
                    <source
                      src="/media/wally-world-service-broadcast.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video broadcast.
                  </video>

                  <div className="tv-static" aria-hidden="true" />
                  <div className="tv-scanlines" aria-hidden="true" />

                  <div className="collection-reveal" aria-live="polite">
                    <div className="reveal-grid" aria-hidden="true">
                      {revealWallys.map((number, index) => (
                        <div
                          className={`reveal-wally reveal-wally-${index + 1}`}
                          key={number}
                        >
                          <Image
                            src={`/collection/${number}.webp`}
                            alt=""
                            width={600}
                            height={600}
                            priority={index < 3}
                            sizes="(max-width: 720px) 38vw, 210px"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="reveal-caption">
                      <span>
                        {mediaFailed
                          ? 'ARCHIVE SIGNAL RESTORED'
                          : 'THE HERD IS ASSEMBLING'}
                      </span>
                      <strong>1,000 leaders for the real world.</strong>
                    </div>
                  </div>

                  <div className="screen-ident" aria-hidden="true">
                    <span>WWS</span>
                    <span>
                      {phase === 'static'
                        ? 'TUNING'
                        : phase === 'broadcast'
                          ? 'ON AIR'
                          : 'THE HERD'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tv-controls" aria-hidden="true">
                <div className="tv-brand">WALLYVISION</div>
                <div className="tv-dial">
                  <span />
                </div>
                <div className="tv-dial small">
                  <span />
                </div>
                <div className="tv-speaker" />
              </div>
            </div>
            <div className="tv-legs" aria-hidden="true">
              <span />
              <span />
            </div>
          </div>

          <div className="broadcast-controls" aria-label="Broadcast controls">
            {phase === 'broadcast' && (
              <>
                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={playing ? 'Pause broadcast' : 'Play broadcast'}
                >
                  {playing ? (
                    <Pause aria-hidden="true" />
                  ) : (
                    <Play aria-hidden="true" />
                  )}
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  className={!muted ? 'is-live' : ''}
                  onClick={enableSound}
                >
                  {muted ? (
                    <VolumeX aria-hidden="true" />
                  ) : (
                    <Volume2 aria-hidden="true" />
                  )}
                  {muted ? 'Turn on the broadcast' : 'Sound on'}
                </button>
                <button type="button" onClick={reveal}>
                  Skip to the collection
                </button>
              </>
            )}
            {phase === 'static' && (
              <>
                <span className="tuning-label">Acquiring signal…</span>
                <button type="button" onClick={reveal}>
                  Skip to the collection
                </button>
              </>
            )}
            {phase === 'reveal' && (
              <>
                <button type="button" onClick={replay}>
                  <RotateCcw aria-hidden="true" /> Replay bulletin
                </button>
                <a href="#registry">Enter the herd registry</a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="broadcast-ticker" aria-label="Breaking news">
        <strong>BREAKING NEWS</strong>
        <div>
          <span>
            1,000 LEADERS ASSEMBLE FOR FAIR &amp; OPEN RWA
            MARKETS&nbsp;&nbsp;◆&nbsp;&nbsp; THE REAL WORLD IS COMING
            ONCHAIN&nbsp;&nbsp;◆&nbsp;&nbsp; WALLY FOUNDATION CLUB TRANSMISSION
            BEGINS&nbsp;&nbsp;◆&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
}
