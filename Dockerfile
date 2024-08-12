# Stage 1: Build the application
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Stage 2: Serve the application
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install pnpm in the final stage as well
RUN npm install -g pnpm

# Copy the built application from the previous stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]