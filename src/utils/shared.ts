export const getShortDescription = (description: string, maxLength = 200) => {
  if (description?.length <= maxLength) return description;
  return `${description?.substring(0, maxLength)}...`;
};
