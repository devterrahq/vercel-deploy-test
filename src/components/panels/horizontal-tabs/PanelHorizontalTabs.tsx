'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { useEffect, useId, useRef, useState } from 'react';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelHorizontalTabsStoryblok } from '@/component-types';
import type { CSSProperties, KeyboardEvent } from 'react';
import './PanelHorizontalTabs.scss';

const FADE_DURATION_MS = 200;
const HEADER_SELECTOR = '.sticky-header';

interface PanelHorizontalTabsProps {
  blok: PanelHorizontalTabsStoryblok;
}

/**
 * Horizontal tabs following the WAI-ARIA tabs pattern: one button per `widget_tab_content`
 * (using its `label`), arrow/Home/End keys move between tabs. Inactive panels stay in the DOM
 * (hidden) so their content is still crawlable. Switching tabs fades the current panel out
 * over `FADE_DURATION_MS` before the selected one fades in. On md+ the tab bar sticks right
 * below the site header, whose height is tracked so the offset stays correct across breakpoints.
 */
export default function PanelHorizontalTabs({ blok }: PanelHorizontalTabsProps) {
  const tabs = blok.tabs ?? [];
  const idPrefix = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const headerHeight = useHeaderHeight();
  const isFadingOut = activeIndex !== displayedIndex;

  useEffect(() => {
    if (!isFadingOut) return;

    const timeout = setTimeout(() => setDisplayedIndex(activeIndex), FADE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [activeIndex, isFadingOut]);

  if (tabs.length === 0) return null;

  const selectTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keyToIndex: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in keyToIndex)) return;

    event.preventDefault();
    selectTab(keyToIndex[event.key]);
  };

  return (
    <PanelGeneric blok={blok} panelName='horizontal-tabs'>
      <div
        className='panel-horizontal-tabs_bar'
        style={{ '--panel-horizontal-tabs-sticky-top': `${headerHeight}px` } as CSSProperties}
      >
        <div className='panel-horizontal-tabs_list' role='tablist'>
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tab._uid}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type='button'
                role='tab'
                id={`${idPrefix}-tab-${i}`}
                aria-controls={`${idPrefix}-panel-${i}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={cn('panel-horizontal-tabs_tab', { 'panel-horizontal-tabs_tab--active': isActive })}
                onClick={() => setActiveIndex(i)}
                onKeyDown={handleKeyDown}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab._uid}
          role='tabpanel'
          id={`${idPrefix}-panel-${i}`}
          aria-labelledby={`${idPrefix}-tab-${i}`}
          hidden={i !== displayedIndex}
          tabIndex={0}
          className={cn('panel-horizontal-tabs_panel', {
            'panel-horizontal-tabs_panel--fading-out': i === displayedIndex && isFadingOut,
          })}
        >
          <StoryblokComponent blok={tab} />
        </div>
      ))}
    </PanelGeneric>
  );
}

/** Tracks the rendered height of the sticky site header (0 when there is none). */
function useHeaderHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
    if (!header) return;

    const observer = new ResizeObserver(() => setHeight(header.offsetHeight));
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return height;
}
