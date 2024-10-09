'use client';

import { ThemeProvider } from 'evergreen-ui';
import React from 'react';
import { hoagiePurple, hoagieOrange, hoagieUI } from './themes';

type ThemeProps = {
  // Options: "purple", "blue", "orange")
  palette?: string;

  // React children (child components)
  children?: React.ReactNode;
};

// Theme is an theme provider component meant for use as an app wrapper
// for all Hoagie applications.
function Theme({ palette = 'purple', children }: ThemeProps) {
  let colorTheme;

  switch (palette) {
    case 'purple':
      colorTheme = hoagiePurple;
      break;
    case 'blue':
      colorTheme = hoagieUI;
      break;
    case 'orange':
      colorTheme = hoagieOrange;
      break;
    default:
      colorTheme = hoagieUI;
  }

  return <ThemeProvider value={colorTheme}>{children}</ThemeProvider>;
}

export default Theme;
