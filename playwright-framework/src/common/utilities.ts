

export function startTime(): string {
    const now =  new Date(Date.now() + 2 * 60 * 1000);
    const formattedstartTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return formattedstartTime;
}


export function endTime(): string {
    const now =  new Date(Date.now() + 15 * 60 * 1000);
    const formattedendTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return formattedendTime;
}


export async function playYouTubeVideo() {
    const { chromium } = require('playwright');

    const chromebrowser = await chromium.launch();
    const chromeContext = await chromebrowser.newContext();
    const chromepage = await chromeContext.newPage();
  
    try {
      // Navigate to YouTube and play a video
      await chromepage.goto('https://www.youtube.com/watch?v=OnuXccVGmHo');
      await chromepage.waitForTimeout(3000); // Wait for the video to load
  
      // Play the video for 15 seconds
      await chromepage.click('button[aria-label="Play"]');
      await chromepage.waitForTimeout(15000);
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await chromebrowser.close();
    }
  }

