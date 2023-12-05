import {sql} from "../database/database.js";

const addList = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const getAllLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const getCountOfLists = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
    if (rows && rows[0] && rows[0].count) {
        return rows[0].count;
    } else return 0;
};


const deactivateList = async (listID) => {
    await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${listID}`;
} ;

export {addList, getAllLists, getCountOfLists, deactivateList };