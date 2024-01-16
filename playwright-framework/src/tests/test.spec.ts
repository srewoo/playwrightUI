// test.spec.ts
import { test, expect } from "@playwright/test";
import CalendarPage from "../pages/CalendarPage";
//import BasePage from '../pages/BasePage';

import ApplicationPage from "../pages/ApplicationPage";
import { GOOGLE_CALENDAR_URL, APPLICATION_URL } from "../common/constants";
import loginCallAI from "../pages/LoginPage";

test("Set up meeting using google calender and zoom", async ({ browser }) => {
  const page = await browser.newPage({
    permissions: ["geolocation", "notifications"],
  });

  // Step 1: Open browser
  const calendarPage = new CalendarPage(page);
  await calendarPage.navigateTo(GOOGLE_CALENDAR_URL);

  // Step 2: Login to Google Calendar
  await calendarPage.login();
  expect(await page.title()).toContain("Google Calendar");

  //Step 3: Schedule a meeting with a Zoom URL
  await calendarPage.scheduleMeetingWithZoom();

  //Step 4: Open callai application URL
  const appPage = new ApplicationPage(page);
  await appPage.navigateTo(APPLICATION_URL);

  //Step 5: Sign in to the application
  const loginPage = new loginCallAI(page);

  await loginPage.loginCallAI();

  //setp 6: Launch the meeting and login to zoom
  await calendarPage.launchMeeting();

  // Close the browser
  await browser.close();
});
