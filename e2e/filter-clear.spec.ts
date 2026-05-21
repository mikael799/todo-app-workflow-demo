import { test, expect } from '@playwright/test'

test('user can filter and clear completed todos', async ({ page }) => {
  await page.goto('/')

  // Create two todos
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk')
  await page.getByPlaceholder('What needs to be done?').press('Enter')
  await page.getByPlaceholder('What needs to be done?').fill('Write code')
  await page.getByPlaceholder('What needs to be done?').press('Enter')

  // Toggle the first todo as completed
  await page.getByRole('checkbox').first().check()

  // Filter by active
  await page.getByRole('button', { name: /active/i }).click()
  await expect(page.getByText('Buy milk')).not.toBeVisible()
  await expect(page.getByText('Write code')).toBeVisible()

  // Filter by completed
  await page.getByRole('button', { name: /completed/i }).click()
  await expect(page.getByText('Buy milk')).toBeVisible()
  await expect(page.getByText('Write code')).not.toBeVisible()

  // Filter by all
  await page.getByRole('button', { name: /all/i }).click()
  await expect(page.getByText('Buy milk')).toBeVisible()
  await expect(page.getByText('Write code')).toBeVisible()

  // Clear completed
  await page.getByRole('button', { name: /clear completed/i }).click()
  await expect(page.getByText('Buy milk')).not.toBeVisible()
  await expect(page.getByText('Write code')).toBeVisible()
})
