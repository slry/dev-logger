import { Decorator } from '@storybook/react';

import { PortalProvider } from '@/shared/providers/portal-context';

export const WithPortalContext: Decorator = (Story) => {
  return (
    <PortalProvider containerId="modal-root">
      <Story />
      <div id="modal-root"></div>
    </PortalProvider>
  );
};
