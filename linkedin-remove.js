const puppeteer = require("puppeteer");
const fs = require("fs");

// ✅ Add your LinkedIn profile links here
const profileLinks = [
"https://www.linkedin.com/in/violina-sharma-ba8268ab",
"https://www.linkedin.com/in/indrajit-chatterjee-indro-44466980",
"https://www.linkedin.com/in/aneeshsreedharan",
"https://www.linkedin.com/in/veer5028",
"https://www.linkedin.com/in/amitworld",
"https://www.linkedin.com/in/prof-dr-ajit-patil-mumbai-india-56281b1a",
"https://www.linkedin.com/in/niharika-rao-987641218",
"https://www.linkedin.com/in/sonika-chawla-669992113",
"https://www.linkedin.com/in/deepakvaswan",
"https://www.linkedin.com/in/vishal--ranjan",
"https://www.linkedin.com/in/bhoj-c-aaba971b2",
"https://www.linkedin.com/in/devanshu-kumar-m",
"https://www.linkedin.com/in/rahul-govil-74b38384",
"https://www.linkedin.com/in/shwetamishra10",
"https://www.linkedin.com/in/harpreet-c-7269077",
"https://www.linkedin.com/in/salaman-devaraj-e-75088b27",
"https://www.linkedin.com/in/gyaneshwari-agarwal-3746481a6",
"https://www.linkedin.com/in/parnika-agarwal",
"https://www.linkedin.com/in/aditiaashi05",
"https://www.linkedin.com/in/shubham-tomar-488701146",
"https://www.linkedin.com/in/mohini-mangal",
"https://www.linkedin.com/in/prerna-bajoria-a5a38910b",
"https://www.linkedin.com/in/shubham-thakur-197773131",
"https://www.linkedin.com/in/abhijitmandal7",
"https://www.linkedin.com/in/sindhoora-rajeev",
"https://www.linkedin.com/in/gaurav-mehra-38a137140",
"https://www.linkedin.com/in/rahul-c-8655a1b7",
"https://www.linkedin.com/in/abdulqadirmd",
"https://www.linkedin.com/in/mularam",
"https://www.linkedin.com/in/siyavar-sharn",
"https://www.linkedin.com/in/shreyas-shendurnikar",
"https://www.linkedin.com/in/anuradha-mandloi-4766a2214",
"https://www.linkedin.com/in/devyanshi-sharma-0904ds",
"https://www.linkedin.com/in/divya-praveen-65aa751a5",
"https://www.linkedin.com/in/swapnil-c-5455a3110",
"https://www.linkedin.com/in/deepak-bhatia-07274a7a",
"https://www.linkedin.com/in/saurabh-tiwari-8366881b3",
"https://www.linkedin.com/in/01luxmis",
"https://www.linkedin.com/in/mohit-malara-74a591184",
"https://www.linkedin.com/in/ram-ji-tiwari-edtech-strategist",
"https://www.linkedin.com/in/deepak-sharma-udayancare",
"https://www.linkedin.com/in/amit-sharma-163192ab",
"https://www.linkedin.com/in/lsrathore",
"https://www.linkedin.com/in/chiragtalreja",
"https://www.linkedin.com/in/samoithpaul",
"https://www.linkedin.com/in/priyanka-hinge-612912110",
"https://www.linkedin.com/in/vedant-chikhale",
"https://www.linkedin.com/in/premjeetkmr9",
"https://www.linkedin.com/in/sakshi-seth-692509125",
"https://www.linkedin.com/in/davistgera",
"https://www.linkedin.com/in/vbhani",
"https://www.linkedin.com/in/rahul-sharma41085",
"https://www.linkedin.com/in/kanav-rai-bba606130",
"https://www.linkedin.com/in/itsnishantthakur",
"https://www.linkedin.com/in/indranil-thakurta-28a74924",
"https://www.linkedin.com/in/shivilsahni",
"https://www.linkedin.com/in/gaurav-g-2194011a",
"https://www.linkedin.com/in/sourabh-kumar-jha-a0991a11b"
];

// Configuration with customized delays
const CONFIG = {
  MANUAL_LOGIN_WAIT: 120000, // 2 minutes for manual login
  PAGE_LOAD_DELAY: 30000,    // 30 seconds after page   
  MORE_BUTTON_DELAY: 5000,   // 5 seconds after More button
  REMOVE_BUTTON_DELAY: 7000, // 7 seconds after Remove Connection
  PROFILE_DELAY: 20000,      // 20 seconds between profiles
  PAGE_TIMEOUT: 30000,
  MAX_RETRIES: 2
};

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Save cookies to file
async function saveCookies(page) {
  try {
    const cookies = await page.cookies();
    fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
    console.log("✅ Cookies saved successfully");
  } catch (error) {
    console.error("❌ Failed to save cookies:", error.message);
  }
}

// Load cookies from file
async function loadCookies(page) {
  try {
    if (fs.existsSync("cookies.json")) {
      const cookiesData = fs.readFileSync("cookies.json", 'utf8');
      const cookies = JSON.parse(cookiesData);
      
      if (cookies && cookies.length > 0) {
        await page.setCookie(...cookies);
        console.log("✅ Cookies loaded successfully");
        return true;
      }
    }
  } catch (error) {
    console.error("❌ Failed to load cookies:", error.message);
  }
  return false;
}

// Simple login check without navigation
async function isCurrentlyLoggedIn(page) {
  try {
    const currentUrl = page.url();
    
    if (currentUrl.includes('/login') || currentUrl.includes('/uas/login')) {
      return false;
    }
    
    if (currentUrl.includes('linkedin.com')) {
      const loggedInElements = await page.evaluate(() => {
        const indicators = [
          document.querySelector('.global-nav'),
          document.querySelector('[data-test-id="nav-search-typeahead-result"]'),
          document.querySelector('.share-box-feed-entry'),
          document.querySelector('#ember-search-typeahead'),
          document.querySelector('.feed-identity-module'),
          document.querySelector('.global-nav__nav')
        ];
        
        return indicators.some(el => el !== null);
      });
      
      return loggedInElements;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// Wait for manual login with less interference
async function waitForManualLogin(page) {
  console.log("\n⚠️ MANUAL LOGIN REQUIRED");
  console.log("📝 Please complete these steps in the browser:");
  console.log("   1. Enter your LinkedIn email/phone and password");
  console.log("   2. Complete any 2FA/captcha if required");
  console.log("   3. Make sure you reach the LinkedIn feed page");
  console.log("   4. Keep the browser window open");
  console.log("\n💡 The script will wait 2 minutes and check periodically...\n");

  const startTime = Date.now();
  const maxWait = CONFIG.MANUAL_LOGIN_WAIT;
  let checkCount = 0;

  while (Date.now() - startTime < maxWait) {
    const remainingTime = Math.round((maxWait - (Date.now() - startTime)) / 1000);
    
    if (checkCount > 3) {
      process.stdout.write(`\r⏳ Waiting for login completion... ${remainingTime}s remaining                    `);
      await new Promise(r => setTimeout(r, 15000));
    } else {
      process.stdout.write(`\r⏳ Checking login... ${remainingTime}s remaining                    `);
      await new Promise(r => setTimeout(r, 10000));
    }
    
    checkCount++;
    
    const isLoggedIn = await isCurrentlyLoggedIn(page);
    if (isLoggedIn) {
      console.log("\n✅ Login successful! Proceeding...");
      return true;
    }
  }

  console.log("\n❌ Login timeout reached");
  return false;
}

// Test login by trying to access a protected page
async function testLoginStatus(page) {
  try {
    console.log("🔍 Verifying login status...");
    
    const response = await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    
    await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after navigation
    console.log("⏳ Waiting 30 seconds after page load...");
    
    const currentUrl = page.url();
    console.log(`📍 Final URL: ${currentUrl}`);
    
    if (currentUrl.includes('/login') || currentUrl.includes('/uas/login')) {
      return false;
    }
    
    const hasLoggedInElements = await page.evaluate(() => {
      const selectors = ['.global-nav', '.feed-identity-module', '#ember-search-typeahead'];
      return selectors.some(selector => document.querySelector(selector) !== null);
    });
    
    return hasLoggedInElements;
    
  } catch (error) {
    console.log("❌ Login test failed:", error.message);
    return false;
  }
}

// Remove Connection function with customized delays
async function removeConnection(page, profileUrl, retryCount = 0) {
  console.log(`\n👉 Processing: ${profileUrl} (Attempt ${retryCount + 1})`);
  
  try {
    // Navigate to profile
    console.log("🌐 Navigating to profile...");
    await page.goto(profileUrl, {
      waitUntil: "domcontentloaded",
      timeout: CONFIG.PAGE_TIMEOUT,
    });

    console.log("⏳ Waiting 30 seconds after page load...");
    await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after navigation

    // Find and click More button
    console.log("🔍 Looking for More button...");
    const moreClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const moreBtn = buttons.find(btn => {
        const text = btn.innerText || btn.getAttribute('aria-label') || '';
        return text.toLowerCase().includes('more');
      });
      
      if (moreBtn) {
        console.log('Found More button:', moreBtn.innerText);
        moreBtn.click();
        return true;
      }
      return false;
    });

    if (!moreClicked) {
      throw new Error("Could not find More button");
    }

    console.log("✅ Clicked More button");
    console.log("⏳ Waiting 5 seconds after clicking More button...");
    await delay(CONFIG.MORE_BUTTON_DELAY); // 5s delay after More button click

    // Look for Remove Connection option
    console.log("🔍 Looking for Remove Connection option...");
    const removeClicked = await page.evaluate(() => {
      console.log('Looking for Remove Connection option...');
      
      // Strategy 1: Look for exact text in clickable elements
      const clickableElements = Array.from(document.querySelectorAll('button, a, div[role="button"], [role="menuitem"]'));
      let removeBtn = clickableElements.find(el => {
        const text = (el.innerText || '').toLowerCase().trim();
        return text === 'remove connection' || text === 'remove connection.';
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 1):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 2: Look for text that contains "remove connection"
      removeBtn = clickableElements.find(el => {
        const text = (el.innerText || '').toLowerCase();
        return text.includes('remove connection') && text.length < 25;
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 2):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 3: Look in dropdown/menu items specifically
      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"], .dropdown-item, .artdeco-dropdown__item'));
      removeBtn = menuItems.find(el => {
        const text = (el.innerText || el.textContent || '').toLowerCase().trim();
        return text.includes('remove connection');
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 3):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 4: Look for spans with the text, then find parent clickable element
      const spans = Array.from(document.querySelectorAll('span'));
      const spanWithText = spans.find(span => {
        const text = (span.innerText || '').toLowerCase().trim();
        return text === 'remove connection';
      });
      
      if (spanWithText) {
        let parent = spanWithText.parentElement;
        while (parent) {
          if (parent.tagName === 'BUTTON' || parent.tagName === 'A' || parent.getAttribute('role') === 'button' || parent.getAttribute('role') === 'menuitem') {
            console.log('Found Remove Connection button (Strategy 4):', parent.innerText);
            parent.click();
            return true;
          }
          parent = parent.parentElement;
        }
      }
      
      // Log all available options for debugging
      console.log('Available dropdown options:');
      const allOptions = Array.from(document.querySelectorAll('button, a, [role="menuitem"], .dropdown-item'));
      allOptions.forEach((option, index) => {
        if (option.innerText && option.innerText.trim()) {
          console.log(`${index}: "${option.innerText.trim()}"`);
        }
      });
      
      return false;
    });

    if (!removeClicked) {
      console.log("⚠️ Could not find Remove Connection option");
      await page.screenshot({path: `debug_${Date.now()}.png`});
      console.log("📸 Screenshot saved for debugging");
      return false;
    }

    console.log("✅ Clicked Remove Connection option");
    console.log("⏳ Waiting 7 seconds after clicking Remove Connection...");
    await delay(CONFIG.REMOVE_BUTTON_DELAY); // 7s delay after Remove Connection click

    // Confirm removal
    console.log("🔍 Looking for confirmation button...");
    const confirmClicked = await page.evaluate(() => {
      console.log('Looking for confirmation button...');
      
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(btn => {
        const text = (btn.innerText || '').toLowerCase().trim();
        return text === 'remove' || text === 'confirm' || text === 'yes' || text.includes('remove connection');
      });
      
      if (confirmBtn) {
        console.log('Found confirmation button:', confirmBtn.innerText);
        confirmBtn.click();
        return true;
      }
      
      console.log('Available buttons for confirmation:');
      buttons.forEach((btn, index) => {
        if (btn.innerText && btn.innerText.trim()) {
          console.log(`${index}: "${btn.innerText.trim()}"`);
        }
      });
      
      return false;
    });

    if (confirmClicked) {
      console.log(`✅ Successfully removed connection: ${profileUrl}`);
    } else {
      console.log(`⚠️ Could not find confirmation button, but remove action may have succeeded`);
    }

    return true;

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    
    if (retryCount < CONFIG.MAX_RETRIES) {
      console.log(`🔄 Retrying in 30 seconds...`);
      await delay(30000); // 30s delay before retry
      return await removeConnection(page, profileUrl, retryCount + 1);
    }
    
    return false;
  }
}

// Main execution
(async () => {
  console.log("🚀 LinkedIn Connection Remover v2.3 (Optimized delays)");
  console.log("⏱️ Delays: Page load: 30s | More button: 5s | Remove button: 7s | Between profiles: 20s");
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

  try {
    // Step 1: Try existing cookies first
    let isLoggedIn = false;
    const cookiesLoaded = await loadCookies(page);

    if (cookiesLoaded) {
      isLoggedIn = await testLoginStatus(page);
    }

    // Step 2: Manual login if needed
    if (!isLoggedIn) {
      await page.goto("https://www.linkedin.com/login", {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      isLoggedIn = await waitForManualLogin(page);
      
      if (isLoggedIn) {
        await saveCookies(page);
        console.log("🎉 Login successful and cookies saved!");
        console.log("⏳ Waiting 30 seconds after successful login...");
        await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after login
      } else {
        throw new Error("Login failed or timed out. Please try again.");
      }
    } else {
      console.log("✅ Already logged in with saved cookies!");
    }

    // Step 3: Process connections
    console.log(`\n📋 Starting to process ${profileLinks.length} connections...`);
    let successCount = 0;

    for (let i = 0; i < profileLinks.length; i++) {
      const link = profileLinks[i];
      console.log(`\n📊 Progress: ${i + 1}/${profileLinks.length}`);
      
      const success = await removeConnection(page, link);
      if (success) successCount++;

      // Wait between profiles (20 seconds)
      if (i < profileLinks.length - 1) {
        console.log(`⏳ Waiting 20 seconds before next profile...`);
        await delay(CONFIG.PROFILE_DELAY); // 20s delay between profiles
      }
    }

    console.log(`\n🎉 Process completed!`);
    console.log(`✅ Successfully processed: ${successCount}/${profileLinks.length}`);
    console.log(`❌ Failed: ${profileLinks.length - successCount}/${profileLinks.length}`);

  } catch (error) {
    console.error(`\n❌ Script error: ${error.message}`);
    console.log("\n💡 Try deleting cookies.json and running again if login issues persist");
  } finally {
    console.log("\n🏁 Closing browser in 10 seconds...");
    await new Promise(r => setTimeout(r, 10000));
    await browser.close();
  }
})();
