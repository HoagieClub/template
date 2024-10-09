import { defaultTheme } from 'evergreen-ui';

const Tab = {
  ...defaultTheme.components.Tab,
  appearances: {
    ...defaultTheme.components.Tab.appearances,
    navbar: {
      ...defaultTheme.components.Tab.appearances.primary,
      fontSize: '14px',
    },
  },
};

export default Tab;
