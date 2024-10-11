
import * as shoppinglistitemService from "../services/shoppinglistitemService.js";


const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };

  const addItemToShoppingList = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    const formData = await request.formData();
    const name = formData.get("name");
  
    await shoppinglistitemService.addItemToList(id, name);
  
    return redirectTo(`/lists/${id}`);
  };
  
  const collectItem = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    const itemId = url.pathname.split("/")[4];
  
    await shoppinglistitemService.collectItem(itemId);
  
    return redirectTo(`/lists/${id}`);
  };

export { addItemToShoppingList, collectItem };

