/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (typeof thali !== 'object' || Array.isArray(thali) || thali === null) {
    return '';
  }

  if (typeof thali.name !== 'string') {
    return '';
  }

  if (Array.isArray(thali.items) === false) {
    return '';
  }

  if (typeof thali.price !== 'number' || !Number.isFinite(thali.price)) {
    return '';
  }

  if (typeof thali.isVeg !== 'boolean') {
    return '';
  }

  const cleanName = thali.name.toUpperCase();

  const vegStatus = thali.isVeg ? 'Veg' : 'Non-Veg';

  const itemsList = thali.items.join(', ');

  const cleanPrice = thali.price.toFixed(2);

  return `${cleanName} (${vegStatus}) - Items: ${itemsList} - Rs.${cleanPrice}`;
}

export function getThaliStats(thalis) {
  // Your code here

  if (Array.isArray(thalis) === false || thalis.length === 0) {
    return null;
  }

  const totalThalis = thalis.length;
  //FILTER CREATES NEW ARRAY AND WE TAKE LENGTH TO GET THE EXACT VEG THALI COUNT HERE
  const vegCount = thalis.filter((thali) => thali.isVeg === true).length;

  const nonVegCount = totalThalis - vegCount;

  const allPrices = thalis.map((thali) => thali.price);

  const totalPriceSum = allPrices.reduce(
    (totalprice, currentPrice) => totalprice + currentPrice,
    0
  );

  const avgPrice = (totalPriceSum / totalThalis).toFixed(2);

  const cheapest = Math.min(...allPrices);

  const costliest = Math.max(...allPrices);

  const names = thalis.map((thali) => thali.name);

  return {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice, // Returned as a 2-decimal string format
    cheapest, // Returned as a pure number
    costliest, // Returned as a pure number
    names, // Returned as an array string collection
  };
}
/**
 * 3. searchThaliMenu(thalis, query)
 * Filters a Thali menu array based on a case-insensitive search term match against names or items.
 *
 * WHY THIS IS IMPORTANT:
 * Users make typos or type in different case combinations (e.g., "Dal", "DAL", "dal").
 * Converting everything to lowercase using .toLowerCase() ensures your search bar finds matches
 * smoothly, regardless of how the user formats their query.
 */
export function searchThaliMenu(thalis, query) {
  // --- 🛡️ STEP 1: DEFENSIVE ENTRY VALIDATION ---

  // Check if thalis is a valid structural array and the search query is explicitly a string
  if (!Array.isArray(thalis) || typeof query !== 'string') {
    return [];
  }

  // --- ⚙️ STEP 2: CASE NORMALIZATION ---

  // Pre-convert the query to lowercase and trim extra white spaces once
  // to maximize execution speed inside the loop later
  const cleanQuery = query.toLowerCase().trim();

  // Edge Case: If the search query is completely empty after trimming spaces, return all items
  if (cleanQuery === '') {
    return thalis;
  }

  // --- 🔍 STEP 3: DUAL-LAYER DEEP FILTERING ---

  // Run .filter() to parse each individual thali configuration container
  return thalis.filter((thali) => {
    // 1. Normalize the primary thali title text to lowercase
    const thaliName = (thali.name || '').toLowerCase();

    // Match Condition A: Check if the thali name itself contains the search term string
    const isMatchInName = thaliName.includes(cleanQuery);

    // Match Condition B: Scan deep within the items array
    // We use .some() to quickly check if at least one individual ingredient matches the text query
    const isMatchInItems =
      Array.isArray(thali.items) &&
      thali.items.some((item) => {
        return (item || '').toLowerCase().includes(cleanQuery);
      });

    // Keep the thali inside the filtered collection if either condition matches (OR truth check)
    return isMatchInName || isMatchInItems;
  });
}
/**
 * 4. generateThaliReceipt(customerName, thalis)
 * Compiles a detailed multi-line pricing receipt layout using template literals.
 *
 * WHY THIS IS IMPORTANT:
 * Generating string layouts like receipts, emails, or PDF templates requires combining
 * structural collection mapping (.map) with raw scalar calculation totals (.reduce).
 * Handling missing parameters defensively stops unvetted operations from throwing errors.
 */
export function generateThaliReceipt(customerName, thalis) {
  // --- 🛡️ STEP 1: DEFENSIVE PROPERTY INPUT CHECKING ---

  // Verify that the customer name is a text string, and the menu payload is a non-empty array
  if (
    typeof customerName !== 'string' ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  ) {
    return '';
  }

  // --- ⚙️ STEP 2: METRIC & STRING AGGREGATION ---

  // 1. Force the customer profile signature text explicitly to UPPERCASE
  const cleanName = customerName.toUpperCase();

  // 2. Generate line items using .map() and flatten them with a newline spacer join
  const lineItems = thalis
    .map((thali) => {
      // Standardize price values cleanly to exactly 2 decimal precision slots
      const standardPrice = (thali.price || 0).toFixed(2);
      return `- ${thali.name} x Rs.${standardPrice}`;
    })
    .join('\n');

  // 3. Compute the grand total bill aggregation using a basic arithmetic loop accumulator
  const grandTotalRaw = thalis.reduce((total, thali) => {
    return total + (thali.price || 0);
  }, 0);

  // Format the aggregate total sum output cleanly to two decimals
  const grandTotalFormatted = grandTotalRaw.toFixed(2);

  // 4. Track total unit counts within the collection array
  const totalItemsCount = thalis.length;

  // --- 📦 STEP 3: VISUAL LAYOUT SYNTHESIS ---

  // Assemble the multi-line printable template segment carefully using backticks
  return `THALI RECEIPT
---
Customer: ${cleanName}
${lineItems}
---
Total: Rs.${grandTotalFormatted}
Items: ${totalItemsCount}`;
}
