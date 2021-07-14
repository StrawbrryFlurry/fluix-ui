export const isNil = (obj: any): obj is null =>
  obj === null || typeof obj === 'undefined';
