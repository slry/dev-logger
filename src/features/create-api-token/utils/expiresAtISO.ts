export const expiresAtISO = (days: number) => {
  const now = new Date();
  now.setDate(now.getDate() + days);

  return now.toISOString();
};
