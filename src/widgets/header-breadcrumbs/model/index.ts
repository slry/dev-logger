interface BreadcrumbWithUrl {
  label: string;
  url: string;
}

export const pathToBreadcrumb = (path: string): BreadcrumbWithUrl[] => {
  const bs = path
    .split('/')
    .filter((p) => p !== '')
    .map((p) => p.replace(/-/g, ' '));

  const bsList = bs.map((b) =>
    b
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  );

  return bsList.map((b, i) => ({
    label: b,
    url: `/${bs.slice(0, i + 1).join('/')}`,
  }));
};
