import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentType, AgentResult, PermitData } from '@solarops/shared';
import { chromium, Browser, Page } from 'playwright';

export interface PermitOfficeInput {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export class PermitOfficeAgent extends BaseAgent {
  private browser?: Browser;

  constructor(config?: AgentConfig) {
    super(AgentType.PERMIT_OFFICE, config);
  }

  async execute(input: PermitOfficeInput): Promise<AgentResult<Partial<PermitData>>> {
    return this.executeWithRetry(async () => {
      this.updateProgress(0, 'Starting permit office search...');
      
      try {
        this.browser = await chromium.launch({ headless: true });
        const page = await this.browser.newPage();

        // Search for permit office
        this.updateProgress(20, 'Searching for local permit office...');
        const permitOfficeUrl = await this.findPermitOffice(page, input);

        // Scrape permit requirements
        this.updateProgress(50, 'Extracting permit requirements...');
        const permitInfo = await this.scrapePermitInfo(page, permitOfficeUrl);

        this.updateProgress(100, 'Permit information collected successfully');

        return {
          permitOfficeUrl,
          ...permitInfo,
          scrapedAt: new Date(),
        };
      } finally {
        if (this.browser) {
          await this.browser.close();
        }
      }
    }, 'Failed to collect permit information');
  }

  private async findPermitOffice(page: Page, input: PermitOfficeInput): Promise<string> {
    const searchQuery = `${input.city} ${input.state} solar permit office`;
    
    await page.goto('https://www.google.com');
    await page.fill('input[name="q"]', searchQuery);
    await page.press('input[name="q"]', 'Enter');
    await page.waitForLoadState('networkidle');

    // Extract first relevant government website
    const links = await page.$$eval('a', (elements) => 
      elements
        .map(el => ({ href: el.href, text: el.textContent }))
        .filter(link => link.href.includes('.gov') || link.href.includes('permit'))
    );

    if (links.length > 0) {
      return links[0].href;
    }

    throw new Error('No permit office found for the specified location');
  }

  private async scrapePermitInfo(page: Page, url: string): Promise<Partial<PermitData>> {
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    // This is a simplified example - in reality, each permit office website
    // would need custom scraping logic
    const permitInfo: Partial<PermitData> = {};

    // Try to find permit fees
    const feeTexts = await page.$$eval('*:has-text("fee"), *:has-text("cost")', 
      elements => elements.map(el => el.textContent)
    );
    
    if (feeTexts.length > 0) {
      permitInfo.permitFees = { raw: feeTexts };
    }

    // Try to find requirements
    const requirementTexts = await page.$$eval('*:has-text("requirement"), *:has-text("required")', 
      elements => elements.map(el => el.textContent)
    );
    
    if (requirementTexts.length > 0) {
      permitInfo.requirements = { raw: requirementTexts };
    }

    // Try to find application links
    const applicationLinks = await page.$$eval('a:has-text("application"), a:has-text("apply")', 
      elements => elements.map(el => el.href)
    );
    
    if (applicationLinks.length > 0) {
      permitInfo.applicationLinks = applicationLinks;
    }

    return permitInfo;
  }
}