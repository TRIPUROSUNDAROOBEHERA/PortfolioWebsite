# ==============================================================================
# STAGE 1: Dependencies & Base
# ==============================================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY frontend/package*.json ./
RUN npm ci


# ==============================================================================
# STAGE 2: Development Target (Vite Hot-Reloading)
# ==============================================================================
FROM dependencies AS development

WORKDIR /app

COPY frontend/ ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


# ==============================================================================
# STAGE 3: Production Build
# ==============================================================================
FROM dependencies AS builder

WORKDIR /app

COPY frontend/ ./

ENV NODE_ENV=production
RUN npm run build


# ==============================================================================
# STAGE 4: Hardened Nginx Production Runtime (Embedded Config)
# ==============================================================================
FROM nginx:1.27-alpine AS production

# Clean default assets and configs
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*

# Embed the production Nginx reverse proxy configuration directly
RUN echo 'upstream backend_server { server backend:8000; }' > /etc/nginx/conf.d/default.conf && \
    echo 'map $http_upgrade $connection_upgrade { default upgrade; "" close; }' >> /etc/nginx/conf.d/default.conf && \
    echo 'server {' >> /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    listen [::]:80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost 127.0.0.1;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    client_max_body_size 25M;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip on;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_vary on;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_proxied any;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_comp_level 6;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_min_length 1024;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/x-javascript application/xml application/xml+rss image/svg+xml;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Frame-Options "DENY" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Referrer-Policy "strict-origin-when-cross-origin" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location /assets/ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=31536000, immutable";' >> /etc/nginx/conf.d/default.conf && \
    echo '        access_log off;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~ ^/(api|admin)/ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_pass http://backend_server;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_http_version 1.1;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header Upgrade $http_upgrade;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header Connection $connection_upgrade;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header Host $host;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-Proto $scheme;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_redirect off;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~ ^/(static|media)/ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_pass http://backend_server;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header Host $host;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-Proto $scheme;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Copy compiled React build
COPY --from=builder /app/dist /usr/share/nginx/html

# Service health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]