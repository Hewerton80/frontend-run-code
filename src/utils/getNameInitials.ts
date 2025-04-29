export const getNameInitial = (username: string) => {
  const names = username.split(" ");

  if (names.length >= 2) {
    const firstLetterFirstName = names[0][0];
    const firstLetterSecondName = names[1][0];
    return `${firstLetterFirstName}${firstLetterSecondName}`;
  }
  const firstLetterSingleName = names[0][0];
  return `${firstLetterSingleName}`;
};
