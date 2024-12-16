// frontend/src/services/tempUserService.ts
export const getTempUserId = (): string => {
  const existingId = localStorage.getItem('tempUserId');
  if (existingId) return existingId;

  const newId = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('tempUserId', newId);
  return newId;
};