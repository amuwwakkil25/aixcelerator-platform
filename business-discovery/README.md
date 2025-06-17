# 🔍 Business Discovery Module

## Purpose
The Business Discovery Module automatically scans and analyzes businesses to identify automation opportunities and build comprehensive business profiles for AI agent recommendations.

## Key Features
- **Website Scraping**: Extract business information, services, and content
- **LinkedIn Analysis**: Company profile, employee data, and industry insights  
- **Data Enrichment**: Enhance profiles with Clearbit, Clay, and other sources
- **Taxonomy Generation**: AI-powered business classification and needs analysis
- **Pain Point Detection**: Identify automation opportunities and inefficiencies

## Key Flows

### 1. Business Scanning Flow
```
URL Input → Website Scraping → LinkedIn Discovery → Data Enrichment → Taxonomy Generation → Business Profile
```

### 2. Analysis Pipeline
```
Raw Data → Content Analysis → Industry Classification → Pain Point Detection → Opportunity Scoring → Recommendations
```

## Components

### ScraperWorker
- Puppeteer/Browserless microservice for web scraping
- Handles dynamic content and JavaScript-heavy sites
- Rate limiting and proxy rotation
- Content extraction and cleaning

### EnrichmentService  
- Clay/Clearbit integration for company data
- Employee count, revenue, funding information
- Technology stack detection
- Contact information discovery

### TaxonomyEngine
- OpenAI + Qdrant for business classification
- Industry categorization and sub-vertical identification
- Service offering analysis and mapping
- Competitive landscape assessment

## API Endpoints

- `POST /scan` - Initiate business scan
- `GET /scan/{id}` - Get scan status and results
- `POST /enrich` - Enrich existing business profile
- `GET /taxonomy/{business_id}` - Get business taxonomy
- `POST /analyze` - Analyze business for automation opportunities

## Data Models

### BusinessProfile
```typescript
interface BusinessProfile {
  id: string;
  url: string;
  name: string;
  industry: string;
  subVertical: string;
  employeeCount: number;
  revenue: string;
  services: string[];
  painPoints: string[];
  techStack: string[];
  opportunities: OpportunityScore[];
  lastUpdated: Date;
}
```

### OpportunityScore
```typescript
interface OpportunityScore {
  category: string;
  score: number;
  description: string;
  estimatedROI: number;
  implementationEffort: 'Low' | 'Medium' | 'High';
}
```