FROM node:18-alpine

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

EXPOSE 8080

# Serve the built app
CMD ["pnpm", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]