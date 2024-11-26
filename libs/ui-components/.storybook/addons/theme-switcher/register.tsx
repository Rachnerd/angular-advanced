// .storybook/addons/theme-switcher/register.tsx
import React from 'react';
import { useGlobals, addons, types } from '@storybook/manager-api';
import { Icons, IconButton } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';

const ADDON_ID = 'theme-switcher';
const TOOL_ID = `${ADDON_ID}/toolbar`;
const THEME_KEY = 'storybook-theme-mode';

// Helper to get story iframe with retry logic
const getStoryIframe = (
  retries = 0,
  maxRetries = 10,
): Promise<HTMLIFrameElement | null> => {
  return new Promise((resolve) => {
    const iframe = document.querySelector(
      '#storybook-preview-iframe',
    ) as HTMLIFrameElement;

    if (iframe?.contentDocument?.body || retries >= maxRetries) {
      resolve(iframe);
      return;
    }

    // Retry after a short delay
    setTimeout(() => {
      resolve(getStoryIframe(retries + 1, maxRetries));
    }, 100);
  });
};

const getStoredTheme = (): boolean => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
};

const setStoredTheme = (value: boolean) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(value));
  } catch {
    // Handle storage errors silently
  }
};

const applyTheme = async (isDark: boolean) => {
  const iframe = await getStoryIframe();
  if (!iframe?.contentDocument?.body) return;

  const body = iframe.contentDocument.body;
  const themeValue = isDark ? 'dark' : 'light';

  body.setAttribute('data-theme', themeValue);
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(`theme-${themeValue}`);
};

function ThemeSwitcher() {
  const [{ themeMode }, updateGlobals] = useGlobals();
  const [isApplying, setIsApplying] = React.useState(false);

  // Initialize theme from storage
  React.useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== themeMode) {
      updateGlobals({ themeMode: storedTheme });
    }
  }, []);

  // Apply theme on story changes
  React.useEffect(() => {
    const handleStoryChange = () => {
      setIsApplying(true);
      applyTheme(themeMode).finally(() => {
        setIsApplying(false);
      });
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

  const toggleTheme = React.useCallback(async () => {
    const newTheme = !themeMode;
    updateGlobals({ themeMode: newTheme });
    setStoredTheme(newTheme);
    await applyTheme(newTheme);
  }, [themeMode]);

  return (
    <IconButton
      key={TOOL_ID}
      active={themeMode}
      title="Toggle theme"
      onClick={toggleTheme}
      disabled={isApplying}
    >
      <Icons icon={themeMode ? 'moon' : 'sun'} />
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
