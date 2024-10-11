import { test, expect } from '@playwright/test';

test('View items in an individual shopping list', async ({ page }) => {
   
    await page.goto('/lists');  

    const shoppingListName = 'Weekly Groceries1'; 
    const listLocator = page.locator('a', { hasText: shoppingListName }).first();
    await expect(listLocator).toBeVisible(); 
    await listLocator.click();

    const pageTitle = page.locator('h1'); 
    await expect(pageTitle).toHaveText(shoppingListName);  

    
});