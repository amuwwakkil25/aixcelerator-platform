# 🚀 Deployment Guide

This guide covers different deployment options for AIXcelerator.

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git repository
- Environment variables configured

## 🌐 Netlify Deployment (Recommended)

### Automatic Deployment

1. **Connect to GitHub**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Set Environment Variables**
   Go to Site settings > Environment variables and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   # Add other environment variables
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Manual Deployment

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

## ▲ Vercel Deployment

### Automatic Deployment

1. **Connect to GitHub**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   Add your environment variables in the Vercel dashboard

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 AWS S3 + CloudFront

### 1. Build the Project
```bash
npm run build
```

### 2. Create S3 Bucket
```bash
aws s3 mb s3://your-bucket-name
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### 3. Upload Files
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### 4. Set Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 5. Create CloudFront Distribution
- Origin: Your S3 bucket
- Default Root Object: index.html
- Error Pages: 404 -> /index.html (for SPA routing)

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Build and Run
```bash
docker build -t aixcelerator .
docker run -p 80:80 aixcelerator
```

## 🔒 Environment Variables

### Required Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Optional Variables
```env
VITE_QDRANT_URL=your_qdrant_url
VITE_QDRANT_API_KEY=your_qdrant_api_key
VITE_CLEARBIT_API_KEY=your_clearbit_api_key
VITE_CLAY_API_KEY=your_clay_api_key
VITE_VAPI_API_KEY=your_vapi_api_key
VITE_SYNTHFLOW_API_KEY=your_synthflow_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

## 🔍 Troubleshooting

### Build Errors
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Verify environment variables

### Deployment Issues
- Check build logs for errors
- Verify environment variables are set
- Ensure all dependencies are installed

### Runtime Errors
- Check browser console for errors
- Verify API endpoints are accessible
- Check CORS settings

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Enable gzip compression
# Configure in your hosting provider
```

### Caching Strategy
- Static assets: 1 year cache
- HTML files: No cache
- API responses: Appropriate cache headers

## 🔐 Security Considerations

- Use HTTPS in production
- Set appropriate CORS headers
- Validate environment variables
- Use secure API keys
- Enable security headers

## 📈 Monitoring

### Analytics
- Google Analytics
- Mixpanel
- Custom event tracking

### Error Monitoring
- Sentry
- LogRocket
- Custom error boundaries

### Performance Monitoring
- Web Vitals
- Lighthouse CI
- Custom performance metrics

## 🚀 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

If you encounter issues during deployment:
- Check the troubleshooting section
- Review deployment logs
- Contact support team
- Join our Discord community

Happy deploying! 🎉