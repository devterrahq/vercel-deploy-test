'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { useState } from 'react';
import { RefLink } from '@/components/internal/RefLink';
import { ArrowRightSvg, SearchSvg } from '@/components/svg';
import { ButtonSVG } from '@/components/widgets/button/WidgetButton';
import * as Nav from '@npm-refactored/pr-navigation';
import * as UtilNav from '@npm-refactored/pr-util-nav';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isLinkDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import MegaMenuAside from '../megamenu-aside/MegamenuAside';
import HeaderBanner from './HeaderBanner';
import type {
  HeaderStoryblok,
  MultilinkStoryblok,
  NavGroupStoryblok,
  NavLinkStoryblok,
  NavRootItemSlideoutStoryblok,
  NavRootItemStoryblok,
  NavSlideItemStoryblok,
} from '@/component-types';
import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import './Header.scss';

interface HeaderProps {
  blok: HeaderStoryblok;
}

export default function Header({ blok }: HeaderProps) {
  return (
    <>
      <div style={{ visibility: 'hidden' }} />
      <header className='sticky-header'>
        <div className='panel-megamenu'>
          <Nav.Root>
            <div className='navigation-root-container'>
              <div className='panel-navigation-header container-lg'>
                <RefLink src={blok?.logo_link}>
                  <Image src={blok?.logo} className='logo' width={394} height={46} />
                </RefLink>

                <Nav.MobileMenuTrigger aria-controls='main-nav-list'>
                  <span className='sr-only'>Toggle Menu</span>
                </Nav.MobileMenuTrigger>
                <UtilityNavHelper blok={blok} />
              </div>
              <NavListHelper blok={blok} />
            </div>

            <Nav.BackgroundOverlay />
          </Nav.Root>
        </div>
      </header>
      <HeaderBanner blok={blok} />
    </>
  );
}

interface NavListHelperProps {
  blok: HeaderStoryblok;
}
function NavListHelper({ blok }: NavListHelperProps) {
  return (
    <Nav.List>
      <MobileMenuSearchHelper />

      <div className='nav-ul-wrapper'>
        <div className='container-lg'>
          <ul className='nav-ul' id='main-nav-list'>
            {blok?.nav_root_items?.map((navRootItem) => {
              // === Simple === //
              if (navRootItem.component === 'nav_root_item') {
                return <SimpleNavRootItemHelper key={navRootItem._uid} rootItem={navRootItem} />;
              }

              // === Slideout === //
              if (navRootItem.component === 'nav_root_item_slideout') {
                return <SlideoutNavRootItemHelper key={navRootItem._uid} rootItem={navRootItem} />;
              }
            })}
          </ul>
        </div>
      </div>

      {blok.cta && blok.cta[0] && (
        <li className='nav-cta col-lg-auto'>
          <StoryblokComponent blok={blok.cta[0]} overrideExternal />
        </li>
      )}

      <div className='panel-util-navigation mobile'>
        <UtilNav.Root>
          {blok?.utility_nav?.map((navGroup, i) => {
            return (
              <UtilNav.NavGroup key={navGroup._uid} className={i === 0 ? 'bg-secondary-blue' : ''}>
                {navGroup.utility_nav_items?.map((navItem) => {
                  return (
                    <UtilNav.NavItem key={navItem._uid}>
                      <LinkWithIconHelper
                        src={navItem.item_link}
                        label={navItem.mobile_item_text || navItem.item_text}
                        before_icon={navItem.before_icon}
                        after_icon={navItem.after_icon}
                      />
                    </UtilNav.NavItem>
                  );
                })}
              </UtilNav.NavGroup>
            );
          })}
        </UtilNav.Root>
      </div>
    </Nav.List>
  );
}

function MobileMenuSearchHelper() {
  return (
    <SearchBox
      classPrefix='mobile'
      label='Site Search'
      inputId='mobile-menu-search'
      placeholder='What can we help you find?'
    />
  );
}

interface SimpleNavRootItemHelperProps {
  rootItem: NavRootItemStoryblok;
}
function SimpleNavRootItemHelper({ rootItem }: SimpleNavRootItemHelperProps) {
  return (
    <Nav.RootItem
      id={rootItem._uid}
      rootItemText={rootItem.root_item_text}
      subMenuType={rootItem.sub_menu_type}
      hasDropdown={rootItem.nav_groups !== undefined && rootItem.nav_groups.length > 0}
      sizing={rootItem.sizing}
      dropdownOffset={0}
      key={rootItem._uid}
      placementOverride='bottom-start'
    >
      {rootItem.nav_groups && rootItem.nav_groups.length > 0 ? (
        <Nav.NavMenuSimple
          id={rootItem._uid}
          asideContent={
            rootItem?.aside && rootItem.aside.length > 0 ? (
              <MegaMenuAside items={rootItem.aside} otherColCount={rootItem.nav_groups?.length || 0} />
            ) : undefined
          }
          hideAside={rootItem.hide_aside}
          subMenuType={rootItem.sub_menu_type}
          sizing={rootItem.sizing}
        >
          <NavContentHelper rootItem={rootItem} navGroups={rootItem.nav_groups} />
        </Nav.NavMenuSimple>
      ) : (
        <RefLink src={rootItem.root_item_link}>{rootItem.root_item_text}</RefLink>
      )}
    </Nav.RootItem>
  );
}

interface SlideoutNavRootItemHelperProps {
  rootItem: NavRootItemSlideoutStoryblok;
}
function SlideoutNavRootItemHelper({ rootItem }: SlideoutNavRootItemHelperProps) {
  return (
    <Nav.SlideRootItem
      key={rootItem._uid}
      id={rootItem._uid}
      rootItemText={rootItem.root_item_text || ''}
      hasDropdown={rootItem.nav_groups !== undefined && rootItem.nav_groups.length > 0}
      dropdownOffset={0}
      sizing={rootItem.sizing}
      placementOverride='bottom-start'
    >
      <Nav.NavMenuSlideout>
        <Nav.MenuBack btnText='Back to main menu' />

        <Nav.MenuHeader headerLabel={rootItem.root_item_text || ''} />

        <ul className='nav-slide-root-item-list'>
          {rootItem.nav_groups?.map((slideItem, i) => {
            if (slideItem.component === 'nav_link') {
              const item = slideItem as NavLinkStoryblok;
              return (
                <Nav.SlideTrigger
                  key={item._uid}
                  id={item._uid || ''}
                  rootItemText={item.link_text || ''}
                  hasDropdown={false}
                  triggerComp={
                    <LinkWithIconHelper
                      src={item.link}
                      label={item.link_text}
                      before_icon={item.before_icon}
                      after_icon={item.after_icon}
                    />
                  }
                />
              );
            }
            return (
              <Nav.SlideTrigger
                key={slideItem._uid}
                id={slideItem._uid || ''}
                rootItemText={slideItem.root_item_text || ''}
                hasDropdown={slideItem.sub_menu !== undefined && slideItem.sub_menu.length > 0}
                triggerComp={
                  slideItem.sub_menu !== undefined && slideItem.sub_menu.length > 0 ? (
                    <>{slideItem.root_item_text}</>
                  ) : (
                    <LinkWithIconHelper src={slideItem.overview_link} label={slideItem.root_item_text} />
                  )
                }
                isFirst={i === 0}
              >
                <Nav.SlideSubmenu id={slideItem._uid} sizing={rootItem.slideout_sizing}>
                  <NavContentHelper rootItem={slideItem} navGroups={slideItem.sub_menu} />
                </Nav.SlideSubmenu>
              </Nav.SlideTrigger>
            );
          })}
        </ul>
      </Nav.NavMenuSlideout>
    </Nav.SlideRootItem>
  );
}

interface NavContentHelperProps {
  rootItem: NavRootItemStoryblok | NavSlideItemStoryblok | NavLinkStoryblok;
  navGroups?: Array<NavGroupStoryblok>;
}
function NavContentHelper({ rootItem, navGroups }: NavContentHelperProps) {
  const render = useRichTextResolver();
  const title = rootItem.overview_title || rootItem.root_item_text;
  const rootItemLink = isLinkDefined(rootItem.root_item_link) ? rootItem.root_item_link : rootItem.overview_link;
  return (
    <>
      <Nav.MenuBack />
      <Nav.MenuHeader headerLabel={rootItem.root_item_text} />
      <Nav.NavHeader location='content'>
        {title ? (
          <LinkWithIconHelper src={rootItemLink} has_svg={true}>
            <span className='link-with-icon-span'>{title}</span>
            <ArrowRightSvg />
          </LinkWithIconHelper>
        ) : null}
        {isRichtextDefined(rootItem.overview_description) ? (
          <div className='overview'>{render(rootItem.overview_description)}</div>
        ) : null}
      </Nav.NavHeader>
      <div className='nav-content-group-container row'>
        {navGroups?.map((simpleItem) => {
          return <NavLinkGroupHelper key={simpleItem._uid} group={simpleItem} />;
        })}
      </div>
    </>
  );
}

interface NavLinkGroupHelperProps {
  group: NavGroupStoryblok;
}
function NavLinkGroupHelper({ group }: NavLinkGroupHelperProps) {
  const render = useRichTextResolver();
  return (
    <Nav.Group columnSpan={group.column_span} key={group._uid}>
      <Nav.NavHeader location='navGroup'>
        {group.group_header && isLinkDefined(group.group_header_link) ? (
          <RefLink src={group.group_header_link}>
            <span className='link-with-icon-span'>{group.group_header}</span>
          </RefLink>
        ) : group.group_header ? (
          <div className='nav-header-container'>
            <span className='link-with-icon-span'>{group.group_header}</span>
          </div>
        ) : null}
      </Nav.NavHeader>

      <ul className='nav-link-group-helper-list row'>
        {group.subitems?.map((navItem) => {
          return (
            <Nav.Item key={navItem._uid} itemSpan={group.subitem_span || '12'}>
              <RefLink src={navItem.link}>{navItem.link_text}</RefLink>
              {isRichtextDefined(navItem.overview_description) ? (
                <div className='overview'>{render(navItem.overview_description)}</div>
              ) : null}
            </Nav.Item>
          );
        })}
      </ul>
    </Nav.Group>
  );
}

interface LinkWithIconHelperProps {
  src?: MultilinkStoryblok;
  label?: string;
  before_icon?: string;
  after_icon?: string;
  has_svg?: boolean;
  children?: ReactNode;
}
function LinkWithIconHelper({ src, label, has_svg, before_icon, after_icon, children }: LinkWithIconHelperProps) {
  return (
    <RefLink src={src} className={has_svg || before_icon || after_icon ? 'link-with-icon' : ''}>
      {before_icon ? ButtonSVG(before_icon) : null}
      {label}
      {children}
      {after_icon ? ButtonSVG(after_icon) : null}
    </RefLink>
  );
}

interface UtilityNavHelperProps {
  blok: HeaderStoryblok;
}
function UtilityNavHelper({ blok }: UtilityNavHelperProps) {
  return (
    <div className='utility-nav-desktop'>
      <UtilNav.Root>
        <div className='utility-nav-search-desktop'>
          <SearchBox classPrefix='desktop' inputId='desktop-search' placeholder='Search' />
        </div>
        {blok?.utility_nav?.map((navGroup) => {
          return (
            <UtilNav.NavGroup key={navGroup._uid}>
              {navGroup.utility_nav_items?.map((navItem) => {
                return (
                  <UtilNav.NavItem key={navItem._uid}>
                    <LinkWithIconHelper
                      src={navItem.item_link}
                      label={navItem.mobile_item_text || navItem.item_text}
                      before_icon={navItem.before_icon}
                      after_icon={navItem.after_icon}
                    />
                  </UtilNav.NavItem>
                );
              })}
            </UtilNav.NavGroup>
          );
        })}
      </UtilNav.Root>
    </div>
  );
}

interface SearchBoxProps {
  placeholder: string;
  label?: string;
  classPrefix: 'desktop' | 'mobile';
  inputId: string;
}
function SearchBox({ placeholder, classPrefix, inputId, label }: SearchBoxProps) {
  const [terms, setTerms] = useState(''),
    [isFocus, setIsFocus] = useState(false);

  function updateTerms(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTerms(e.target.value);
  }
  function checkSubmit(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  function handleFocus() {
    setIsFocus(true);
  }
  function handleBlur() {
    setIsFocus(false);
  }
  function handleSearch() {
    if (terms) {
      const params = new URLSearchParams();
      params.append('query', terms);
      const newpath = '/search' + '?' + params.toString();
      location.href = newpath;
      // This does not work when already on the search page
      // router.push(newpath);
    }
  }

  return (
    <div className={`searchbox ${classPrefix}-search ${isFocus ? 'active' : ''}`}>
      {label ? (
        <label className={`${classPrefix}-search--label`} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={`searchbox--wrapper ${classPrefix}-search--wrapper`}>
        <input
          id={inputId}
          type='text'
          title='search'
          aria-label={label ? undefined : 'search'}
          className={`searchbox--input ${classPrefix}-search--input`}
          placeholder={placeholder}
          value={terms}
          onChange={updateTerms}
          onKeyDown={checkSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          aria-label='Submit Search'
          className={`searchbox--button ${classPrefix}-search--button`}
          onClick={handleSearch}
        >
          <SearchSvg color={classPrefix === 'desktop' ? '#555555' : '#000000'} />
        </button>
      </div>
    </div>
  );
}
