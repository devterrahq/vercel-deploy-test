'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import * as React from 'react';
import { RefLink } from '@/components/internal/RefLink';
import { ArrowRightSvg } from '@/components/svg';
import { ButtonSVG } from '@/components/widgets/button/WidgetButton';
import * as Nav from '@npm-refactored/pr-navigation';
import * as UtilNav from '@npm-refactored/pr-util-nav';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import MegaMenuAside from '../megamenu-aside/MegamenuAside';
import type {
  HeaderStoryblok,
  MultilinkStoryblok,
  NavGroupStoryblok,
  NavLinkStoryblok,
  NavRootItemSlideoutStoryblok,
  NavRootItemStoryblok,
  NavSlideItemStoryblok,
} from '@/component-types';
import './ConferenceHeader.scss';

interface HeaderProps {
  blok: HeaderStoryblok;
}

export default function ConferenceHeader({ blok }: HeaderProps) {
  return (
    <header className='sticky-header'>
      <div className='panel-conference-megamenu'>
        <Nav.Root>
          <div className='navigation-root-container'>
            <div className='panel-navigation-header container-lg'>
              <RefLink src={blok?.logo_link} className='logo-mobile'>
                <Image src={blok?.logo} className='logo' width={180} height={50} />
              </RefLink>

              <UtilityNavHelper blok={blok} />

              <Nav.MobileMenuTrigger aria-controls='main-nav-list'>
                <span className='sr-only'>Toggle Menu</span>
              </Nav.MobileMenuTrigger>
            </div>
            <NavListHelper blok={blok} />
          </div>

          <Nav.BackgroundOverlay />
        </Nav.Root>
      </div>
    </header>
  );
}

interface NavListHelperProps {
  blok: HeaderStoryblok;
}
function NavListHelper({ blok }: NavListHelperProps) {
  return (
    <Nav.List>
      <div className='nav-ul-wrapper'>
        <div className='container-lg conference-container-lg'>
          <RefLink src={blok?.logo_link}>
            <Image src={blok?.logo} className='logo' width={233} height={66} />
          </RefLink>
          <ul className='nav-ul' id='main-nav-list'>
            <>
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
              {blok.cta && blok.cta[0] && (
                <li className='nav-cta col-lg-auto'>
                  <StoryblokComponent blok={blok.cta[0]} overrideExternal />
                </li>
              )}
            </>
          </ul>
        </div>
      </div>

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
      id={rootItem._uid || ''}
      rootItemText={rootItem.root_item_text || ''}
      hasDropdown={rootItem.nav_groups !== undefined && rootItem.nav_groups.length > 0}
      dropdownOffset={0}
      sizing={rootItem.sizing}
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
  const title = rootItem.overview_title || rootItem.root_item_text;
  const render = useRichTextResolver();

  return (
    <>
      <Nav.MenuBack />
      <Nav.MenuHeader headerLabel={rootItem.root_item_text} />
      <Nav.NavHeader location='content'>
        {title ? (
          <LinkWithIconHelper src={rootItem.root_item_link || rootItem.overview_link} has_svg={true}>
            <h5>{title}</h5>
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
        {group.group_header && group.group_header_link ? (
          <RefLink src={group.group_header_link}>
            <h5>{group.group_header}</h5>
          </RefLink>
        ) : group.group_header ? (
          <h5>{group.group_header}</h5>
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
  children?: React.ReactNode;
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
    <div className='conference-utility-nav-desktop'>
      <UtilNav.Root>
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
