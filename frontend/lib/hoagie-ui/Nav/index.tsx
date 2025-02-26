/**
 * @overview Navigation bar for the template app with a stateful profile.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import { type ComponentType } from 'react';

import { type User } from '@auth0/nextjs-auth0/types';
import {
  majorScale,
  Pane,
  Text,
  Position,
  Popover,
  Avatar,
  TabNavigation,
  Tab,
} from 'evergreen-ui';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import ProfileCard from '@/lib/hoagie-ui/ProfileCard';
import { hoagieTemplate } from '@/lib/hoagie-ui/Theme/themes';

/**
 * Interface for tab items in the navigation bar.
 */
interface TabItem {
  title: string;
  href: string;
}

/**
 * Props for the Nav component.
 */
interface NavProps {
  // The name of the app for generating the `hoagie{name}` title.
  name: string;

  // A custom component to be used in place of the hoagie logo.
  LogoComponent?: ComponentType;

  // A custom component to be used in place of the header color strip.
  HeaderComponent?: ComponentType;

  // A list of tab objects for the navbar, each with `title` and `href` fields.
  tabs?: Array<TabItem>;

  // Authenticated user data.
  user?: User;

  // A flag to show the "beta" development disclaimer on the hoagie app logo.
  beta?: boolean;
}

/**
 * Nav is a navbar meant for internal navigations throughout
 * different Hoagie applications.
 */
export function Nav({
  name,
  LogoComponent,
  HeaderComponent,
  tabs = [],
  user,
  beta = false,
}: NavProps) {
  const theme = hoagieTemplate;
  const router = useRouter();
  const pathname = usePathname();
  const username = user?.name;

  return (
    <Pane elevation={1}>
      {HeaderComponent ? (
        <HeaderComponent />
      ) : (
        <Pane width='100%' height={20} background={theme.colors.teal500} />
      )}
      <Pane
        display='flex'
        justifyContent='center'
        width='100%'
        height={majorScale(9)}
        background='white'
      >
        <Pane
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          height='100%'
          maxWidth={1200}
          paddingX={majorScale(5)}
          fontSize={25}
        >
          <Link href='/'>
            <Pane cursor='pointer' position='relative'>
              {LogoComponent ? (
                <LogoComponent />
              ) : (
                <Pane>
                  <Text
                    is='h2'
                    display='inline-block'
                    className='hoagie logo'
                    color={theme.colors.gray900}
                  >
                    hoagie
                  </Text>
                  <Text
                    is='h2'
                    display='inline-block'
                    className='hoagie logo'
                    color={theme.colors.teal500}
                  >
                    {name}
                  </Text>
                  {beta && (
                    <Text className='hoagie beta' position='absolute' color={theme.colors.gray900}>
                      (BETA)
                    </Text>
                  )}
                </Pane>
              )}
            </Pane>
          </Link>
          <Pane display='flex' alignItems='center'>
            <TabNavigation>
              {tabs.map((tab) => (
                <Tab
                  key={tab.title}
                  id={tab.title}
                  isSelected={pathname === tab.href}
                  appearance='primary'
                  onSelect={() => router.push(tab.href)}
                  fontSize={14}
                >
                  {tab.title}
                </Tab>
              ))}
            </TabNavigation>
            {user && (
              <Popover content={<ProfileCard user={user} />} position={Position.BOTTOM}>
                <Avatar
                  name={username}
                  style={{
                    cursor: 'pointer',
                    border: `2px solid ${theme.colors.tealTint}`,
                  }}
                  backgroundColor={theme.colors.teal100}
                  size={40}
                  marginLeft={majorScale(4)}
                />
              </Popover>
            )}
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Nav;
