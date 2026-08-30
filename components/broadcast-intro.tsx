'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Phase = 'static' | 'broadcast' | 'leaving';

export function BroadcastIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>('static');
  const [departed, setDeparted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const completeExit = useCallback(() => {
    document.body.classList.remove('broadcast-locked');
    setDeparted(true);
    exitTimerRef.current = null;
  }, []);

  const finishBroadcast = useCallback(() => {
    if (exitTimerRef.current) return;
    videoRef.current?.pause();
    setPlaying(false);
    setPhase('leaving');
    exitTimerRef.current = window.setTimeout(completeExit, 720);
  }, [completeExit]);

  useEffect(() => {
    document.body.classList.add('broadcast-locked');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const tuneTimer = window.setTimeout(
      () => {
        if (reducedMotion) completeExit();
        else setPhase('broadcast');
      },
      reducedMotion ? 100 : 950,
    );
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finishBroadcast();
    };
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.clearTimeout(tuneTimer);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      window.removeEventListener('keydown', keyHandler);
      document.body.classList.remove('broadcast-locked');
    };
  }, [completeExit, finishBroadcast]);

  useEffect(() => {
    if (phase !== 'broadcast' || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = muted;
    void video.play().catch(() => setPlaying(false));
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (video.paused) void video.play().then(() => setPlaying(true));
  };

  return (
    <section
      className={`arrival-broadcast phase-${phase}${departed ? ' is-departed' : ''}`}
      aria-label="Wally World Service opening broadcast"
      aria-hidden={departed}
    >
      <div className="arrival-ident" aria-hidden="true">
        <span>WALLY WORLD SERVICE</span>
        <span>TRANSMISSION 001</span>
      </div>

      <div className="tv-photo-stage">
        <Image
          className="tv-photo-frame tv-photo-frame-desktop"
          src="/media/vintage-tv-frame.png"
          alt=""
          fill
          priority
          sizes="(max-width: 700px) 1px, 85vw"
        />
        <Image
          className="tv-photo-frame tv-photo-frame-mobile"
          src="/media/vintage-tv-frame-mobile.png"
          alt=""
          fill
          priority
          sizes="(max-width: 700px) 88vw, 1px"
        />

        <div className="photo-tv-screen">
          <video
            ref={videoRef}
            className="arrival-video"
            muted={muted}
            playsInline
            preload="auto"
            aria-label="Wally World Service opening film"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={finishBroadcast}
            onError={finishBroadcast}
          >
            <source
              src="/media/wally-world-service-broadcast.mp4"
              type="video/mp4"
            />
            <track
              kind="captions"
              src="/media/wally-world-service-captions.vtt"
              srcLang="en"
              label="English"
            />
            Your browser does not support this video.
          </video>
          <div className="arrival-static" aria-hidden="true" />
          <div className="arrival-scanlines" aria-hidden="true" />
          <div className="arrival-title-card" aria-hidden="true">
            <span>A WALLY WORLD SERVICE BULLETIN</span>
            <strong>
              THE REAL WORLD
              <br />
              IS COMING ONCHAIN
            </strong>
          </div>
        </div>
      </div>

      <div className="arrival-controls" aria-label="Broadcast controls">
        {phase === 'static' ? (
          <span>ACQUIRING SIGNAL</span>
        ) : (
          <button type="button" onClick={togglePlayback}>
            {playing ? 'PAUSE' : 'PLAY'}
          </button>
        )}
        {phase === 'broadcast' && (
          <button type="button" onClick={toggleSound}>
            {muted ? 'TURN SOUND ON' : 'SOUND ON'}
          </button>
        )}
        <button
          type="button"
          className="arrival-skip"
          onClick={finishBroadcast}
        >
          SKIP TO TODAY&apos;S EDITION
        </button>
      </div>
    </section>
  );
}
