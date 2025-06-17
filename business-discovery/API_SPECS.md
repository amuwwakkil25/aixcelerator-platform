# Business Discovery API Specifications

## Base URL
`/api/v1/business-discovery`

## Authentication
All endpoints require Bearer token authentication.

## Endpoints

### 1. Initiate Business Scan
```http
POST /scan
Content-Type: application/json
Authorization: Bearer {token}

{
  "url": "https://company.com",
  "depth": "standard", // "basic" | "standard" | "deep"
  "includeLinkedIn": true,
  "enrichmentSources": ["clearbit", "clay"]
}
```

**Response:**
```json
{
  "scanId": "scan_123456",
  "status": "initiated",
  "estimatedDuration": 120,
  "message": "Scan initiated successfully"
}
```

### 2. Get Scan Status
```http
GET /scan/{scanId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "scanId": "scan_123456",
  "status": "processing", // "initiated" | "processing" | "completed" | "failed"
  "progress": 65,
  "currentStep": "enrichment",
  "steps": [
    {"name": "scraping", "status": "completed", "duration": 45},
    {"name": "enrichment", "status": "processing", "duration": null},
    {"name": "taxonomy", "status": "pending", "duration": null}
  ],
  "result": null
}
```

### 3. Get Business Profile
```http
GET /profile/{businessId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "biz_123456",
  "url": "https://company.com",
  "name": "Acme Corp",
  "industry": "SaaS",
  "subVertical": "Project Management",
  "employeeCount": 150,
  "revenue": "$10M-$50M",
  "services": ["Project Management", "Team Collaboration", "Time Tracking"],
  "painPoints": [
    {
      "category": "Customer Support",
      "description": "High volume of repetitive support tickets",
      "severity": "high",
      "automationPotential": 0.85
    }
  ],
  "techStack": ["React", "Node.js", "PostgreSQL", "AWS"],
  "opportunities": [
    {
      "category": "Customer Support Automation",
      "score": 0.92,
      "description": "Deploy chatbot for common inquiries",
      "estimatedROI": 340,
      "implementationEffort": "Medium"
    }
  ],
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

### 4. Enrich Existing Profile
```http
POST /enrich/{businessId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "sources": ["clearbit", "clay"],
  "forceRefresh": false
}
```

### 5. Get Taxonomy Analysis
```http
GET /taxonomy/{businessId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "businessId": "biz_123456",
  "primaryIndustry": "Technology",
  "subIndustries": ["SaaS", "B2B Software"],
  "businessModel": "Subscription",
  "targetMarket": "SMB",
  "competitiveSet": ["Asana", "Monday.com", "Trello"],
  "marketPosition": "Mid-market challenger",
  "growthStage": "Scale-up"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "invalid_url",
  "message": "The provided URL is not accessible or invalid",
  "details": {
    "url": "https://invalid-url.com",
    "reason": "DNS resolution failed"
  }
}
```

### 429 Rate Limited
```json
{
  "error": "rate_limited",
  "message": "Too many scan requests",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "scan_failed",
  "message": "Business scan failed due to internal error",
  "scanId": "scan_123456"
}
```

## Webhooks

### Scan Completion
```http
POST {webhook_url}
Content-Type: application/json

{
  "event": "scan.completed",
  "scanId": "scan_123456",
  "businessId": "biz_123456",
  "timestamp": "2024-01-15T10:30:00Z"
}
```