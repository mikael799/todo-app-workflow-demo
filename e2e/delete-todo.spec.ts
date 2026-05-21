import { test, expect } from '@playwright/test'

test('user can delete a todo', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk')
  await page.getByPlaceholder('What needs to be done?').press('Enter')
  await expect(page.getByText('Buy milk')).toBeVisible()
  await page.getByRole('button', { name: /delete/i }).click()
  await expect(page.getByText('Buy milk')).not.toBeVisible()
})
