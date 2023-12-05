import { sql } from "../database/database.js";

const addItemToList = async (id, name) => {
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ id }, ${ name })`;
};

const getCollectedItemsFromList = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items 
                    WHERE shopping_list_id = ${listId} AND collected = TRUE 
                    ORDER BY name`;
};
const getNotCollectedItemsFromList = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items 
                    WHERE shopping_list_id = ${listId} AND collected = FALSE 
                    ORDER BY name`;
};

const getCountOfItems = async () => {
    const rows = await sql`SELECT COUNT(*) FROM shopping_list_items AS count`;

    if (rows && rows[0] && rows[0].count) {
        return rows[0].count;
    }
    return 0;
};

const markItemAsCollected = async(itemID) => {
    await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${itemID}` ;
};

const getList = async (listID) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${listID}`;

    if(rows && rows.length > 0) {
        return rows[0];
    }
    return {id: 0, name: "Unknown", active: true}

};

export { addItemToList, getCountOfItems, getList, markItemAsCollected, getCollectedItemsFromList, getNotCollectedItemsFromList };