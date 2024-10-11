import { test, expect } from '@playwright/test';

test('Add an item to a shopping list', async ({ page }) => {
   
    await page.goto('/lists'); 

    
    const shoppingListName = 'Weekly Groceries'; 
    const shoppingListLink = page.locator('a', { hasText: shoppingListName }).first();
    await expect(shoppingListLink).toBeVisible();
    await shoppingListLink.click();

    const newItemName = `Bananas - ${Math.random()}`; 
    const inputItemName = page.locator('input[name="name"]'); 
    await expect(inputItemName).toBeVisible(); 
    await inputItemName.fill(newItemName); 

    const addItemButton = page.locator('form[action*="/lists/"] button[type="submit"]').first(); // Use first() to avoid ambiguity
    await expect(addItemButton).toBeVisible(); 
    await expect(addItemButton).toBeEnabled(); 
    await addItemButton.click(); 

    
    const uncollectedItemsList = page.locator('ul').nth(0); 
    const newItemInUncollected = uncollectedItemsList.locator('li', { hasText: newItemName });
    await expect(newItemInUncollected).toBeVisible(); 
});
