import { renderFile } from "../deps.js";
import * as listServices from "../services/listServices.js";
import * as itemServices from "../services/itemServices.js";

const responseDetails = {                           
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};
  
//This is mow in two places???
const redirectTo = (path) => {                    
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
};

const getStatistics = async () => {

    const data = {
        isEmpty: listServices.getCountOfLists(),
        lists: await listServices.getCountOfLists(),
        items: await itemServices.getCountOfItems()
    };
    return new Response(await renderFile("main.eta", data), responseDetails); 

};

export {getStatistics};