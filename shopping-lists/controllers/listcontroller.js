import {renderFile } from "../deps.js";
import * as listServices from "../services/listServices.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listServices.addList(name);

  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listServices.getAllLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deactivateList = async(request) => {
  const url = new URL(request.url);
  const listID = url.pathname.split('/')[2];
  await listServices.deactivateList(listID);
  return redirectTo("/lists")
};

export { addList, viewLists, deactivateList };