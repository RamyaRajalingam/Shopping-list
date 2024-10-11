const { test, expect } = require("@playwright/test");

test("Can create a shopping list.", async ({ page }) => {
  await page.goto("/lists");

  
  await page.fill('input[name="name"]', "Weekly Groceries1");

  
  await page.click('input[value="Create shopping list!"]');

  
  const lastShoppingListItem = page.locator('ul li:last-child a', { hasText: 'Weekly Groceries' });
  await expect(lastShoppingListItem).toBeVisible(); 
}); 