import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

interface PortalProviderProps {
  containerId?: string;
}

export const PortalContext = createContext<HTMLElement | null>(null);

export const PortalProvider: FC<PropsWithChildren<PortalProviderProps>> = ({
  children,
  containerId,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerId) {
      setContainer(document.body);
      return;
    }

    const containerElement = document.getElementById(containerId);
    if (containerElement) {
      setContainer(containerElement);
    } else {
      console.warn(`Container with id "${containerId}" not found.`);
    }
  }, [containerId]);
  return <PortalContext.Provider value={container}>{children}</PortalContext.Provider>;
};
