import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingService from "../services/shoppingService.js";
import * as shoppinglistitemService from "../services/shoppinglistitemService.js";


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

const viewMainPage = async () => {
  const statistics = await shoppingService.getStatistics();

  if (statistics.numberOfLists === 0) {
    return new Response(await renderFile("main.eta", { message: "No shopping lists yet." }), {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  return new Response(await renderFile("main.eta", { statistics }), {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
};

const addShopping = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingService.create(name);

  return redirectTo("/lists");
};

const viewShopping = async (request) => {
  const data = {
    shopping_lists: await shoppingService.getAllActiveShopping(),
  };

  return new Response(await renderFile("shopping.eta", data), responseDetails);
};

const deactivateShopping = async (request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[2]; // Extract the shopping list id from URL

  await shoppingService.deactivateShoppingList(id);

  return redirectTo("/lists");
};

const viewShoppingitems = async (request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[2];

  const data = {
    shoppingList: await shoppingService.getShoppingListById(id),
    uncollectedItems: await shoppinglistitemService.findUncollectedItems(id),
    collectedItems: await shoppinglistitemService.findCollectedItems(id),
  };

  return new Response(await renderFile("shopping_list.eta", data), responseDetails);
};

export { viewMainPage,addShopping, viewShopping, deactivateShopping,viewShoppingitems};

