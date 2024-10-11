
import { test, expect } from '@playwright/test';

test('Page has expected title and headings', async ({ page }) => {
    await page.goto('/');

    
    await expect(page).toHaveTitle('Shopping Lists!');
     
}); 