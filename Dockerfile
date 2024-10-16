###################################################################################
# Stage 1: Install dependencies
###################################################################################
FROM docker.io/library/node:20.18.0-alpine3.20 AS dependencies

# Set the maintainer label
LABEL maintainer="nkorczynski@gmail.com"

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

###################################################################################
# Stage 2: Build the application
###################################################################################
FROM dependencies AS builder

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

###################################################################################
# Stage 3: Development environment
###################################################################################
FROM docker.io/library/node:20.18.0-alpine3.20 AS development

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock from the dependencies stage
COPY --from=dependencies /app/package.json /app/yarn.lock ./
COPY --from=dependencies /app/node_modules ./node_modules

# Expose the application port
EXPOSE 8000

# Command to run the application in development mode
CMD ["yarn", "develop"]

###################################################################################
# Stage 4: Production environment
###################################################################################
FROM docker.io/library/nginx:1.27.2-alpine3.20-slim AS production

# Set the path to the public directory where static files will be served from
ENV PUBLIC_PATH=/usr/share/nginx/html
#ENV HTTP_PORT=8080

# Copy the build output from the builder stage to the path specified in PUBLIC_PATH
COPY --from=builder /app/public "${PUBLIC_PATH}"


# COPY nginx-boot.sh /sbin/nginx-boot

# # Create necessary directories and set permissions
# RUN mkdir -p /var/cache/nginx /run/nginx \
#   && chown -R nginx:nginx /var/cache/nginx /run/nginx /usr/share/nginx/html /sbin/nginx-boot \
#   && chmod +x /sbin/nginx-boot

# # Switch to non-privileged user
# USER nginx

# Set up volume for static files
VOLUME ["${PUBLIC_PATH}"]

# # Start Nginx
# CMD [ "/sbin/nginx-boot" ]
# EXPOSE "${HTTP_PORT}"
