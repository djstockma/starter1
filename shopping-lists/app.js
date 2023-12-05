import { serve } from "./deps.js";
import  * as listController from "./controllers/listcontroller.js";
import * as itemController from "./controllers/itemcontroller.js";
import * as mainController from "./controllers/mainController.js";
import { configure } from "./deps.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if(url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if(url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if(url.pathname === "/" && request.method === "GET") {
    return await mainController.getStatistics();
  } else if(url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.markAsCollected(request);
  } else if(url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addToList(request);
  } else if(url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await itemController.viewListItems(request);
  } else if(url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  }

  console.log("Responding with Hello world!");
  return new Response("Hello worldx!!!!");
};

serve(handleRequest, { port: 7777 });
