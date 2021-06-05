/**
 * Generalizing string boolean inputs on directives with no input
 * @see https://angular.io/guide/template-typecheck#input-setter-coercion
 */
export const booleanInput = (value: '' | boolean): value is true =>
  value === '' || value;
