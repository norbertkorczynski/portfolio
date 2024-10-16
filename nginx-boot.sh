#!/bin/sh

# MIT License (MIT)
#
# Copyright (c) 2015 gatsbyjs
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# Set default values for environment variables
export CHARSET=${CHARSET:-utf-8}
export WORKER_PROCESSES=${WORKER_PROCESSES:-1}
export WORKER_CONNECTIONS=${WORKER_CONNECTIONS:-1024}
export HTTP_PORT=${HTTP_PORT:-80}
export NGINX_CONF=/etc/nginx/mushed.conf
export PUBLIC_PATH=${PUBLIC_PATH:-/pub}
export GZIP_TYPES=${GZIP_TYPES:-application/javascript application/x-javascript application/rss+xml text/javascript text/css image/svg+xml}
export GZIP_LEVEL=${GZIP_LEVEL:-6}
export CACHE_IGNORE=${CACHE_IGNORE:-html}
export CACHE_PUBLIC=${CACHE_PUBLIC:-avif|gif|ico|jpg|jpeg|png|svg|webp|js|jsx|css|less|swf|eot|ttf|otf|woff|woff2}
export CACHE_PUBLIC_EXPIRATION=${CACHE_PUBLIC_EXPIRATION:-3m}
export CLIENT_MAX_BODY_SIZE=${CLIENT_MAX_BODY_SIZE:-64k}

# Set rewrite rules based on TRAILING_SLASH variable
if [ "${TRAILING_SLASH}" = false ]; then
  REWRITE_RULE="rewrite ^(.+)/+\$ \$1 permanent;"
  TRY_FILES="try_files \$uri \$uri/index.html =404;"
else
  REWRITE_RULE="rewrite ^([^.]*[^/])\$ \$1/ permanent;"
  TRY_FILES="try_files \$uri \$uri/ \$uri/index.html =404;"
fi

# Configure file caching if enabled
if [ "$DISABLE_FILE_CACHE" != true ]; then
  FILE_CACHE="open_file_cache max=10000 inactive=3600s; open_file_cache_valid 7200s; open_file_cache_min_uses 2;"
fi

# Load custom server configuration if it exists
CUSTOM_SERVER_CONFIG=""
if [ -f /etc/nginx/server.conf ]; then
  CUSTOM_SERVER_CONFIG=$(< /etc/nginx/server.conf)
fi

# Build the Nginx configuration
cat <<EOF > "$NGINX_CONF"
daemon              off;
worker_processes    ${WORKER_PROCESSES:-1};
user                nginx

events {
  worker_connections $WORKER_CONNECTIONS;
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  keepalive_timeout  15;
  autoindex          off;
  server_tokens      off;
  port_in_redirect   off;
  absolute_redirect  off;
  sendfile           off;
  tcp_nopush         on;
  tcp_nodelay        on;

  client_max_body_size $CLIENT_MAX_BODY_SIZE;
  client_header_buffer_size 16k;
  large_client_header_buffers 4 16k;

  # File caching configuration
  $FILE_CACHE

  # Gzip configuration
  gzip                on;
  gzip_vary           on;
  gzip_proxied        any;
  gzip_types          $GZIP_TYPES;
  gzip_buffers        16 8k;
  gzip_comp_level     $GZIP_LEVEL;

  access_log         /dev/stdout;
  error_log          /dev/stderr error;

  server {
    listen $HTTP_PORT;
    root $PUBLIC_PATH;

    index index.html;
    autoindex off;
    charset $CHARSET;

    error_page 404 /404.html;

    location ~* \.($CACHE_IGNORE)$ {
      add_header Cache-Control "no-store";
      expires    off;
    }
    location ~* \.($CACHE_PUBLIC)$ {
      add_header Cache-Control "public";
      expires +$CACHE_PUBLIC_EXPIRATION;
    }

    $REWRITE_RULE
    $TRY_FILES
    $CUSTOM_SERVER_CONFIG
  }
}
EOF

# Output the Nginx configuration if debugging is enabled
[ -n "$DEBUG" ] && cat "$NGINX_CONF"

# Create necessary directories and set permissions
mkdir -p /var/cache/nginx /run/nginx
chown -R nginx:nginx /var/cache/nginx /run/nginx /usr/share/nginx/html


# Execute Nginx with the generated configuration
exec nginx -c "$NGINX_CONF"
