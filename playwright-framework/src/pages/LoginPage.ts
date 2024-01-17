import { Page } from "playwright";
import BasePage from "./BasePage";
import {
  APPLICATION_URL, EXTERNALEMAIL,CALLAIPASSWORD,GOOGLEUSERNAME
} from ".././common/constants";
import { expect }from "@playwright/test";



export default class CalendarPage extends BasePage {
  isMeetingAdded: any;
  constructor(page: Page) {
    super(page);
  }

  async loginCallAI(): Promise<void> {

    //await this.page.context().clearCookies();

    await this.page.goto(APPLICATION_URL);
    await this.page.getByPlaceholder('Enter username').fill(GOOGLEUSERNAME);
    await this.page.getByPlaceholder('Enter password').fill(CALLAIPASSWORD);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    await this.page
      .getByRole("menuitem", { name: " Call AI" })
      .locator("span")
      .first()
      .click();
    await this.page.locator('#recording-list-sidebar-content').getByText('Upcoming meetings').click();

    await expect(this.page.url()).toContain("my-upcoming-meetings");

    await expect(this.page.locator('div').filter({ hasText: /^test playwright call$/ }).nth(1)).toBeVisible();

  }
}
