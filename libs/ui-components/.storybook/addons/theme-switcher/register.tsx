// .storybook/addons/theme-switcher/register.tsx
// @ts-expect-error React is a dev dep
import React from 'react';
import { useGlobals, addons, types } from '@storybook/manager-api';
import { Icons, IconButton } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';

const ADDON_ID = 'theme-switcher';
const TOOL_ID = `${ADDON_ID}/toolbar`;

// Helper to get story iframe with retry logic

const applyTheme = (mode: 'dark' | 'light') => {
  const iframe = document.querySelector(
    '#storybook-preview-iframe',
  ) as HTMLIFrameElement;
  if (!iframe?.contentDocument?.body) return;

  const body = iframe.contentDocument.body;

  body.setAttribute('data-theme', mode);
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(`theme-${mode}`);
};

function ThemeSwitcher() {
  const [{ themeMode }, updateGlobals] = useGlobals();
  const [isApplying, setIsApplying] = React.useState(false);

  // Initialize theme from storage
  React.useEffect(() => {
    const storedTheme = 'light';
    if (storedTheme !== themeMode) {
      updateGlobals({ themeMode: storedTheme });
    }
  }, []);

  // Apply theme on story changes
  React.useEffect(() => {
    const handleStoryChange = () => {
      setIsApplying(true);
      applyTheme(themeMode);
      setIsApplying(false);
    };

    // Apply initially
    handleStoryChange();

    // Listen for story changes
    const channel = addons.getChannel();
    channel.on(STORY_RENDERED, handleStoryChange);

    return () => {
      channel.off(STORY_RENDERED, handleStoryChange);
    };
  }, [themeMode]);

  const toggleTheme = React.useCallback(() => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    updateGlobals({ themeMode: newTheme });
    applyTheme(newTheme);
  }, [themeMode]);

  return (
    <IconButton
      key={TOOL_ID}
      active={themeMode}
      title="Toggle theme"
      onClick={toggleTheme}
      disabled={isApplying}
    >
      <Icons icon={themeMode !== 'light' ? 'moon' : 'sun'} />
    </IconButton>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Theme Switcher',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeSwitcher />,
  });
});
