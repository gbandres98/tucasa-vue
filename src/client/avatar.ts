import { Md5 } from "md5-typescript";

export const getAvatarUrl = (email: string) => {
  if (!email) return `https://www.gravatar.com/avatar/?d=mp`;

  const hash = Md5.init(email.toLowerCase());

  return `https://www.gravatar.com/avatar/${hash}?d=retro`;
};
