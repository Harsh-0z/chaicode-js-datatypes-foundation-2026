/**
 * ☕ Chai Tapri Order System - String Basics
 *
 * Guddu ki chai tapri hai college ke bahar. Customers order dete hain,
 * aur Guddu ko string methods use karke orders handle karne hain.
 * Tu Guddu ka helper hai — basic string methods seekh aur orders process kar!
 *
 * Methods to explore: .length, .toUpperCase(), .toLowerCase(),
 *   .trim(), .includes(), .charAt(), .at()
 *
 * Functions:
 *
 *   1. getChaiOrderLength(order)
 *      - Pehle .trim() se extra spaces hatao, phir .length se count karo
 *      - Agar order string nahi hai, return -1
 *      - Example: getChaiOrderLength("  masala chai  ") => 11
 *
 *   2. shoutChaiOrder(order)
 *      - Guddu apne helper ko UPPERCASE mein order shout karta hai
 *      - Pehle .trim() karo, phir .toUpperCase()
 *      - Agar order string nahi hai ya trim ke baad empty hai, return ""
 *      - Example: shoutChaiOrder("masala chai") => "MASALA CHAI"
 *
 *   3. whisperChaiOrder(order)
 *      - Jab koi secretly order karta hai, lowercase mein likho
 *      - Pehle .trim() karo, phir .toLowerCase()
 *      - Agar order string nahi hai ya trim ke baad empty hai, return ""
 *      - Example: whisperChaiOrder("ADRAK CHAI") => "adrak chai"
 *
 *   4. hasSpecialIngredient(order, ingredient)
 *      - Check karo ki order mein koi special ingredient hai ya nahi
 *      - Dono ko .toLowerCase() karo, phir .includes() use karo
 *      - Agar koi bhi string nahi hai, return false
 *      - Example: hasSpecialIngredient("Elaichi Masala Chai", "elaichi") => true
 *
 *   5. getFirstAndLastChar(order)
 *      - .charAt(0) se pehla character aur .at(-1) se aakhri character nikalo
 *      - Pehle .trim() karo
 *      - Return: { first, last }
 *      - Agar order string nahi hai ya trim ke baad empty hai, return null
 *      - Example: getFirstAndLastChar("masala chai") => { first: "m", last: "i" }
 *
 * @example
 *   getChaiOrderLength("  masala chai  ")  // => 11
 *   shoutChaiOrder("masala chai")          // => "MASALA CHAI"
 *   hasSpecialIngredient("Elaichi Chai", "elaichi")  // => true
 */
export function getChaiOrderLength(order) {
  // Your code here
  //first is it String

  if (typeof order !== 'string') return -1;

  let clean_order = order.trim();

  return clean_order.length;
}

export function shoutChaiOrder(order) {
  // Your code here
  // check is order is string

  if (typeof order !== 'string') return '';

  return order.trim().toUpperCase();
}

export function whisperChaiOrder(order) {
  // Your code here
  if (typeof order !== 'string') return '';

  return order.trim().toLowerCase();
}

export function hasSpecialIngredient(order, ingredient) {
  // Your code here

  if (typeof order !== 'string') return false;
  let order_lowercase = order.toLowerCase();
  let ingredient_new = String(ingredient);

  let ingredient_lowercase = ingredient_new.toLowerCase();
  return order_lowercase.includes(ingredient_lowercase);a
}

export function getFirstAndLastChar(order) {
  // Your code here
  if (typeof order !== 'string' || order.trim() === '') return null;

  let clean_order = order.trim();

  let first_char = clean_order.charAt(0);
  let length = clean_order.length;

  let last_char = clean_order.charAt(length - 1);

  return {
    first: first_char,
    last: last_char,
  };
}
