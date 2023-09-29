/**
 * used for prefixing names
 * @param value
 * @param suffix
 */
export const formatName = (value: string, suffix: string): string => {
  const dot = '.';

  if (!value || value.indexOf(dot) === -1) return suffix + value;

  const strings = value.split(dot);

  strings[1] = strings[1] + dot + suffix;

  return strings.join(dot);
};
