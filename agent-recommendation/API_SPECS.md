# Agent Recommendation API Specifications

## Base URL
`/api/v1/agent-recommendation`

## Authentication
All endpoints require Bearer token authentication.

## Endpoints

### 1. Generate Agent Recommendations
```http
POST /recommend
Content-Type: application/json
Authorization: Bearer {token}

{
  "businessId": "biz_123456",
  "filters": {
    "categories": ["voice", "chat", "task"],
    "maxComplexity": "Medium",
    "minROI": 100,
    "budget": 50000,
    "timeline": 90
  },
  "preferences": {
    "prioritizeROI": true,
    "riskTolerance": "medium"
  }
}
```

**Response:**
```json
{
  "businessId": "biz_123456",
  "recommendations": [
    {
      "agentId": "agent_cs_chatbot_001",
      "name": "Customer Support Chatbot",
      "category": "chat",
      "description": "AI-powered chatbot for handling common customer inquiries",
      "matchScore": 0.92,
      "estimatedROI": 340,
      "implementationEffort": "Medium",
      "timeToValue": 30,
      "requiredIntegrations": ["zendesk", "slack"],
      "tags": ["customer-service", "cost-reduction", "24/7-support"],
      "pricing": {
        "setup": 5000,
        "monthly": 500,
        "perInteraction": 0.10
      }
    }
  ],
  "totalCount": 15,
  "generatedAt": "2024-01-15T10:30:00Z"
}
```

### 2. Get Agent Catalog
```http
GET /agents?category={category}&industry={industry}&page={page}&limit={limit}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "agents": [
    {
      "id": "agent_cs_chatbot_001",
      "name": "Customer Support Chatbot",
      "category": "chat",
      "description": "AI-powered customer service automation",
      "capabilities": [
        "Natural language understanding",
        "Multi-language support",
        "Escalation handling",
        "Knowledge base integration"
      ],
      "integrations": ["zendesk", "intercom", "slack", "teams"],
      "industries": ["saas", "ecommerce", "healthcare"],
      "averageROI": 280,
      "deploymentTime": "2-4 weeks",
      "successRate": 0.89
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### 3. Get Detailed Agent Information
```http
GET /agents/{agentId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "agent_cs_chatbot_001",
  "name": "Customer Support Chatbot",
  "category": "chat",
  "description": "Advanced AI chatbot for customer service automation",
  "longDescription": "This chatbot uses state-of-the-art NLP to handle customer inquiries...",
  "capabilities": [
    "Natural language understanding",
    "Sentiment analysis",
    "Multi-language support",
    "Escalation handling"
  ],
  "technicalSpecs": {
    "platform": "Web, Mobile, API",
    "languages": ["English", "Spanish", "French"],
    "responseTime": "< 2 seconds",
    "accuracy": "94%",
    "uptime": "99.9%"
  },
  "integrations": {
    "required": ["api_access"],
    "optional": ["zendesk", "intercom", "slack"],
    "webhooks": true,
    "sso": true
  },
  "pricing": {
    "model": "usage-based",
    "setup": 5000,
    "monthly": 500,
    "perInteraction": 0.10,
    "enterprise": "custom"
  },
  "metrics": {
    "averageROI": 280,
    "deploymentTime": "2-4 weeks",
    "successRate": 0.89,
    "customerSatisfaction": 4.6
  }
}
```

### 4. Calculate ROI
```http
POST /calculate-roi
Content-Type: application/json
Authorization: Bearer {token}

{
  "agentId": "agent_cs_chatbot_001",
  "businessId": "biz_123456",
  "parameters": {
    "monthlyTickets": 5000,
    "averageHandlingTime": 15,
    "agentHourlyRate": 25,
    "expectedAutomationRate": 0.70
  }
}
```

**Response:**
```json
{
  "agentId": "agent_cs_chatbot_001",
  "businessId": "biz_123456",
  "analysis": {
    "costSavings": {
      "annual": 156000,
      "monthly": 13000,
      "hoursSaved": 5200
    },
    "revenueIncrease": {
      "annual": 45000,
      "conversionImprovement": 0.15
    },
    "totalBenefit": 201000,
    "implementationCost": 15000,
    "netROI": 340,
    "paybackPeriod": 2.3,
    "confidenceLevel": 0.85
  },
  "breakdown": {
    "currentCosts": {
      "agentSalaries": 180000,
      "trainingCosts": 12000,
      "toolingCosts": 6000
    },
    "projectedCosts": {
      "agentSetup": 5000,
      "monthlyFees": 6000,
      "maintenanceCosts": 3000
    }
  },
  "assumptions": [
    "70% of tickets can be automated",
    "Average handling time: 15 minutes",
    "Agent hourly rate: $25"
  ]
}
```

### 5. Get Case Studies
```http
GET /case-studies?agentId={agentId}&industry={industry}&company_size={size}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "caseStudies": [
    {
      "id": "case_001",
      "agentId": "agent_cs_chatbot_001",
      "company": {
        "name": "TechCorp Inc.",
        "industry": "SaaS",
        "size": "500-1000",
        "revenue": "$50M-$100M"
      },
      "challenge": "High volume of repetitive customer support tickets",
      "solution": "Deployed AI chatbot to handle tier-1 support inquiries",
      "results": {
        "ticketReduction": 0.65,
        "responseTimeImprovement": 0.80,
        "costSavings": 120000,
        "customerSatisfactionIncrease": 0.25
      },
      "timeline": {
        "implementation": "6 weeks",
        "timeToValue": "2 weeks"
      },
      "testimonial": {
        "quote": "The chatbot transformed our customer support operations...",
        "author": "Sarah Johnson",
        "title": "VP of Customer Success"
      }
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "invalid_business_profile",
  "message": "Business profile not found or incomplete",
  "details": {
    "businessId": "biz_123456",
    "missingFields": ["industry", "painPoints"]
  }
}
```

### 404 Not Found
```json
{
  "error": "agent_not_found",
  "message": "The specified agent does not exist",
  "agentId": "agent_invalid_001"
}
```

## Webhooks

### Recommendation Generated
```http
POST {webhook_url}
Content-Type: application/json

{
  "event": "recommendation.generated",
  "businessId": "biz_123456",
  "recommendationCount": 8,
  "topAgent": {
    "id": "agent_cs_chatbot_001",
    "matchScore": 0.92
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```