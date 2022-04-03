import { formatDistanceToNow } from "date-fns";

export const getFromDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, { addSuffix: true });
  return fromNow;
};
