 # Use Node.js 22 alpine for a lightweight base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run the build (type errors are ignored via next.config.js)
RUN npm run build

# Expose the development port
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]

