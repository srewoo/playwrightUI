// BasePage.ts
import { Page } from 'playwright';
import { GOOGLE_CALENDAR_URL } from '../common/constants';



export default class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(GOOGLE_CALENDAR_URL);
  }
}


