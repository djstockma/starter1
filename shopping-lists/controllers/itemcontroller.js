import {renderFile } from "../deps.js";
import * as itemServices from "../services/itemServices.js";

const responseDetails = {                           
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};
  
//This is now in two places???
const redirectTo = (path) => {                    
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
};

const addToList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL(request.url)
    const listID = url.pathname.split("/")[2]
    await itemServices.addItemToList(listID, name);
    return redirectTo(`/lists/${listID}`);
};
  
const viewListItems = async (request) => {
  const url = new URL(request.url)
  const listID = url.pathname.split("/")[2]
    const data = {
      list: await itemServices.getList(listID),
      id: listID,
      collectedItems: (await itemServices.getCollectedItemsFromList(listID)),
      notCollectedItems: (await itemServices.getNotCollectedItemsFromList(listID)),
    };
    return new Response(await renderFile("list.eta", data), responseDetails);
};

const markAsCollected = async(request) => {
  const url = new URL(request.url)
  const listID = url.pathname.split("/")[2]
  const ID = url.pathname.split("/")[4]
  await itemServices.markItemAsCollected(ID)
  return redirectTo(`/lists/${listID}`);
};

export{ addToList, viewListItems, markAsCollected };