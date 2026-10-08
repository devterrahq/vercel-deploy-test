'use client';

import { useEffect, useRef, useState } from 'react';
import { HoneycombHeroBackgroundSvg } from '@/components/svg/HoneycombHeroBackgroundSvg';
import { getPaddingBottomClass, getPaddingTopClass } from '@npm-refactored/classname-helpers';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import {
  BootstrapColumnToNextImageSizes,
  isAssetDefined,
  isRichtextDefined,
} from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelHeroWithVideoStoryblok } from '@/component-types';
import './Hero.scss';
import { getEmbedUrl } from '@/helpers/video-embed';

interface PanelHeroWithVideoProps {
  blok: PanelHeroWithVideoStoryblok;
}

export default function PanelHeroWithVideo({ blok }: PanelHeroWithVideoProps) {
  const render = useRichTextResolver();
  const contentClasses = cn(
    'col',
    'col-md-7',
    'col-lg-5',
    'content-col',
    getPaddingTopClass(blok.panel_padding_top, 'panel'),
    getPaddingBottomClass(blok.panel_padding_bottom, 'panel'),
  );
  const heroImageSize = BootstrapColumnToNextImageSizes(10);
  const blokType = blok?.video_embed?.[0]?.component || '';
  const embedPlayerId = blokType === 'widget_youtube_embed' ? 'player' : 'vimeo-player';
  const iframeContainerClass =
    blokType === 'widget_youtube_embed' ? 'panel-hero-yt-video-container' : 'panel-hero-vimeo-container';
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement & { player?: YT.Player }>(null);
  const vimeoPlayerRef = useRef<Vimeo.Player | null>(null);
  const [isYouTubeApiReady, setIsYouTubeApiReady] = useState(false);
  const [isVimeoApiReady, setIsVimeoApiReady] = useState(false);
  const videoData = getEmbedUrl(blokType, blok?.video_embed);

  useEffect(() => {
    // Load YouTube API
    const loadYouTubeApi = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        window.onYouTubeIframeAPIReady = () => setIsYouTubeApiReady(true);
        document.head.appendChild(tag);
      } else {
        setIsYouTubeApiReady(true);
      }
    };

    // Load Vimeo API
    const loadVimeoApi = () => {
      if (!window.Vimeo) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.onload = () => setIsVimeoApiReady(true);
        document.head.appendChild(script);
      } else {
        setIsVimeoApiReady(true);
      }
    };

    if (blokType === 'widget_youtube_embed') {
      loadYouTubeApi();
    } else if (blokType === 'widget_vimeo_embed') {
      loadVimeoApi();
    }
  }, [blokType]);

  useEffect(() => {
    if (blokType === 'widget_youtube_embed' && isYouTubeApiReady && iframeRef.current) {
      const player = new YT.Player('player', {
        videoId: videoData.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          playsinline: 1,
          playlist: videoData.videoId,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            if (iframeRef.current) {
              iframeRef.current.player = event.target;
            }
          },
        },
      });

      iframeRef.current.player = player;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYouTubeApiReady, blokType]);

  useEffect(() => {
    if (blokType === 'widget_vimeo_embed' && isVimeoApiReady && iframeRef.current) {
      if (!vimeoPlayerRef.current) {
        vimeoPlayerRef.current = new Vimeo.Player(iframeRef.current, {
          id: parseInt(videoData.videoId, 10),
          autoplay: true,
          muted: true,
          loop: true,
          background: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVimeoApiReady, blokType]);

  const handlePlayPause = () => {
    if (blokType === 'widget_html5_video_embed' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          return;
        });
      }
    } else if (blokType === 'widget_youtube_embed' && iframeRef.current?.player) {
      const player = iframeRef.current.player;

      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } else if (blokType === 'widget_vimeo_embed' && vimeoPlayerRef.current) {
      if (isPlaying) {
        vimeoPlayerRef.current
          .pause()
          .then(() => {
            setIsPlaying(false);
          })
          .catch(() => {
            return;
          });
      } else {
        vimeoPlayerRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            return;
          });
      }
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <section className='panel-hero'>
      {/* TODO: Need to update display logic to be more encompassing so fallback works */}
      {blok?.video_embed?.length ?? 0 > 0 ? (
        <div className='panel-hero-video'>
          {blokType === 'widget_html5_video_embed' ? (
            <video
              className='video-background'
              src={videoData.embedUrl}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className={iframeContainerClass}>
              <div id={embedPlayerId} ref={iframeRef} className='embed-background' />
            </div>
          )}
          <button className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`} onClick={handlePlayPause} />
        </div>
      ) : isAssetDefined(blok.image) ? (
        <div className='panel-hero-image'>
          <Image src={blok.image} sizes={heroImageSize} priority />
        </div>
      ) : null}

      {/* TODO: Need to correct mobile - they overlap at that size, need to determine what the expected output is based on the standard hero */}
      {isRichtextDefined(blok.content) ? (
        <div className='panel-hero-content'>
          <div className='container'>
            <div className='row'>
              <div className={contentClasses}>
                <div className='panel-hero-honeycomb'>
                  <HoneycombHeroBackgroundSvg />
                </div>
                <div className='content-wrapper richtext-margin-helper text-dark-navy'>{render(blok.content)}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
