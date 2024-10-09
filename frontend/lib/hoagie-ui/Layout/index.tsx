'use client';

import { Pane } from 'evergreen-ui';
import React from 'react';

interface LayoutProps {
  /** React children (child components)
   * @ignore */
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Pane display='flex' flexDirection='column' minHeight='100vh' background='blue100'>
      {children}
    </Pane>
  );
}

export default Layout;
