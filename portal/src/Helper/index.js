import { isNullOrUndefined } from 'util';

export const getFormattedString = (element) => {
  return isNullOrUndefined(element) ? 'N/A' : element;
}