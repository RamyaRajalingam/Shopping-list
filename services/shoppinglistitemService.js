import { sql } from "../database/database.js"; 


const addItemToList = async (shoppingListId, itemName) => {
  return await sql`INSERT INTO shopping_list_items (shopping_list_id,name) VALUES (${shoppingListId}, ${itemName})`;
};
const findUncollectedItems = async (shoppingListId) => {
  const rows = await sql`
    SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${shoppingListId} 
    AND collected IS FALSE
    ORDER BY name ASC`;

  return rows || [];
};

const findCollectedItems = async (shoppingListId) => {
  const rows = await sql`
    SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${shoppingListId} 
    AND collected IS TRUE
    ORDER BY name ASC`;

  return rows || [];
};

const collectItem = async (itemId) => {
    return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`;
};

export { findUncollectedItems, findCollectedItems,addItemToList, collectItem };