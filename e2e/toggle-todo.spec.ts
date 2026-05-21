import { test, expect } from '@playwright/test'

test('user can toggle a todo', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk')
  await page.getByPlaceholder('What needs to be done?').press('Enter')
  await page.getByRole('checkbox').check()
  await expect(page.getByText('Buy milk')).toHaveCSS('text-decoration-line', 'line-through')
})
