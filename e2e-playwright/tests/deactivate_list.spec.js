
import { test, expect } from '@playwright/test';

test('Can deactivate a shopping list', async ({ page }) => {
    await page.goto('/lists'); 

    const shoppingListName = 'october'; 

    
    const listLocator = page.locator('a', { hasText: shoppingListName });
    await expect(listLocator).toBeVisible();

    
    const deactivateButton = listLocator.locator('xpath=following-sibling::form/input[@type="submit"][1]');
    await deactivateButton.click();

    
    await page.waitForTimeout(1000); 

    
    await expect(listLocator).toBeHidden(); 
});
 