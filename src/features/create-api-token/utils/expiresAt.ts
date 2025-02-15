export const expiresAt = (days: number) => {
  const now = new Date();
  now.setDate(now.getDate() + days);

  return now.toLocaleDateString();
};
