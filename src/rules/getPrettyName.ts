export const getPrettyName = (value: string, remove?: string): string => {
  if (value === '') {
    return value;
  }

  let strings = value.split(/(?=[A-Z])/);

  if (remove) {
    strings = strings.filter((v) => v.toLowerCase() !== remove.toLowerCase());
  }

  return strings.map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
};
