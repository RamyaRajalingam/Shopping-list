import { sql } from "../database/database.js";

const getStatistics = async () => {
 
  const listCountResult = await sql`SELECT COUNT(*) FROM shopping_lists WHERE active = TRUE`;
  const numberOfLists = listCountResult[0].count;

  
  const itemCountResult = await sql`SELECT COUNT(*) FROM shopping_list_items`;
  const numberOfItems = itemCountResult[0].count;

  return { numberOfLists, numberOfItems };
};



const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const getAllActiveShopping = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const deactivateShoppingList = async (shopping_list_id) => {
  await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${shopping_list_id}`;
};

const getShoppingListById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};



export { getStatistics,create, getAllActiveShopping,deactivateShoppingList,getShoppingListById };