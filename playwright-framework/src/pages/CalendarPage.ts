// CalendarPage.ts
import { Page } from "playwright";
import BasePage from "./BasePage";
import {
  GOOGLEPASSWORD,
  GOOGLEUSERNAME,
  GOOGLE_CALENDAR_URL,
  ZOOM_MEETING_URL,
  EXTERNALEMAIL,
} from ".././common/constants";
import { startTime, endTime, playYouTubeVideo } from "../common/utilities";
import { expect } from "playwright/test";
const { firefox } = require("playwright");

export default class CalendarPage extends BasePage {
  isMeetingAdded: any;
  constructor(page: Page) {
    super(page);
  }

  async login(): Promise<void> {

    await this.page.goto(GOOGLE_CALENDAR_URL);
    await this.page.click(
      "(//span[@class='button__label'][normalize-space()='Sign in'])[2]"
    );
    await this.page.fill("#identifierId", GOOGLEUSERNAME);
    await this.page.click("//span[normalize-space()='Next']");
    await this.page.fill("input[name='Passwd']", GOOGLEPASSWORD);
    await this.page.keyboard.press("Enter");
  }

  async scheduleMeetingWithZoom(): Promise<void> {
    const formattedStartTime = startTime();
    const formattedEndTime = endTime();

    // Implement logic to schedule a meeting with a Zoom URL
    await this.page.getByRole("button", { name: "Create" }).click();
    await this.page.waitForTimeout(3000);

    await this.page.keyboard.press("Enter");

    await this.page.getByRole("button", { name: "More options" }).click();

    await this.page.click('[aria-label="Title"][placeholder="Add title"]');
    await this.page.fill(
      '[aria-label="Title"][placeholder="Add title"]',
      "test playwright call"
    );

    await this.page.getByPlaceholder("Add guests").click();
    await this.page.getByPlaceholder("Add guests").fill(EXTERNALEMAIL);
    await this.page
      .locator("div")
      .filter({ hasText: /^abcd@mt\.com$/ })
      .first()
      .click();

    await this.page.getByRole("combobox", { name: "Start time" }).click();
    await this.page
      .getByRole("combobox", { name: "Start time" })
      .fill(formattedStartTime);
    await this.page.getByRole("combobox", { name: "End time" }).click();
    await this.page.getByLabel("End time").fill(formattedEndTime);

    await this.page.getByLabel("Description", { exact: true }).click();
    await this.page
      .getByLabel("Description", { exact: true })
      .fill(ZOOM_MEETING_URL);

    await this.page.getByLabel("Save").click();
    await this.page.getByRole("button", { name: "Send", exact: true }).click();

    await this.page.screenshot({ path: "screenshot.png" });

    await this.page.waitForTimeout(6000);

    await expect(await this.page.title()).toContain("Google Calendar");


  }

  async launchMeeting(): Promise<void> {
    // Implement logic to launch a meeting

    await this.page.goto("https://app.zoom.us/wc/home");

    await this.page.getByRole("button", { name: "Sign In" }).click();
    await this.page.waitForLoadState();
    await this.page.getByLabel("Sign in with Google").click();
    await this.page.getByLabel("Email or phone").click();
    await this.page
      .getByLabel("Email or phone")
      .fill("patelrohit040@gmail.com");
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.getByLabel("Enter your password").click();
    await this.page.getByLabel("Enter your password").fill("Pass@1213");
    await this.page.getByRole("button", { name: "Next" }).click();

    //await this.page.waitForTimeout(3000)

    await this.page.getByLabel("Join").click();

    await this.page.getByPlaceholder("Meeting ID or Personal Link").click();
    await this.page
      .getByPlaceholder("Meeting ID or Personal Link")
      .fill("9163049383");
    await this.page.getByRole("button", { name: "Join" }).click();

    await this.page.waitForTimeout(13000);

    const joinAudioButton = await this.page
      .frameLocator("#webclient")
      .locator('button:has-text("Join Audio by Computer")');
    const participantButton = await this.page
      .frameLocator("#webclient")
      .locator('button:has-text("Participants")');
    const unMuteButtom = await this.page
      .frameLocator("#webclient")
      .locator('button:has-text("Unmute")');

    await joinAudioButton.click();

    await this.page.waitForTimeout(5000);

    const x = 649; // Adjust the x-coordinate as needed
    const y = 407; // Adjust the y-coordinate as needed
    await this. page.mouse.click(x, y);


    await unMuteButtom.click();

    await participantButton.click();

    await expect(
      this.page.frameLocator("#webclient").getByLabel("rohit patel (Host, Me)")
    ).toContainText("rohit patel");

    await playYouTubeVideo();

    //Intentionally placed wait time : Bot waiing in meetings
    //await this.page.waitForTimeout(200000);

    await this. page.mouse.click(x, y);


    await this.page
      .frameLocator("#webclient")
      .locator('button:has-text("End")')
      .click();
    await this.page
      .frameLocator("#webclient")
      .locator('button:has-text("End Meeting for All")')
      .click();
  }
}
