
import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as shoppingController from "./controllers/shoppingController.js";
import * as shoppinglistController from "./controllers/shoppinglistController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


  const handleRequest = async (request) => {
    const url = new URL(request.url);
   
    if (url.pathname === "/" && request.method === "GET") {
      return await shoppingController.viewMainPage();
    } else if (url.pathname === "/lists" && request.method === "POST") {
      return await shoppingController.addShopping(request);
    } else if (url.pathname === "/lists" && request.method === "GET") {
      return await shoppingController.viewShopping(request);
    } else if (url.pathname.match(/^\/lists\/\d+\/deactivate$/) && request.method === "POST") {
      return await shoppingController.deactivateShopping(request);
    } else if (url.pathname.match(/^\/lists\/\d+$/) && request.method === "GET") {
      return await shoppingController.viewShoppingitems(request);
    } else if (url.pathname.match(/^\/lists\/\d+\/items$/) && request.method === "POST") {
      return await shoppinglistController.addItemToShoppingList(request);
    } else if (url.pathname.match(/^\/lists\/\d+\/items\/\d+\/collect$/) && request.method === "POST") {
      return await shoppinglistController.collectItem(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
  };

serve(handleRequest, { port: 7777 });
