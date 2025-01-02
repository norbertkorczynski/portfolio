It was originally designed by Brittany Chiang and can be found [here](https://github.com/bchiang7/v4).

## 📦 Development & Production Using Docker

### Prerequisites
1. Docker Engine installed (or an equivalent containerization platform, e.g., Podman).
2. _(Optional: Easier setup)_ Docker Compose configured (or an equivalent tool for the installed platform, e.g., Podman Compose).

### Development Container

The development container allows you to modify files on your machine using your preferred editor while running a fully functional development environment. All dependencies are installed automatically with a single command.

**Use Docker Compose**

Run the following command to start the `dev` container:

```sh
docker-compose up -d dev
```
**What This Does:**
- Builds the `portfolio:dev` image using the `development` target from the Dockerfile.
- Mounts the current directory (`.`) to `/app` inside the container, enabling real-time synchronization of changes.
- Exposes port `8090` on your local machine and maps it to port `8000` in the container.
- Starts the container named `portfolio_dev` in the background.


### Production Container

The web container runs the production version of your application. It provides a lightweight environment optimized for serving your website to end users.

**Use Docker Compose**

Run the following command to start the `web` container in detached mode:

```sh
docker-compose run -p 8080:80 web
```
**What This Does:**
- Builds the `portfolio:prod` image using the production target from the Dockerfile.
- Maps port `8080` (this can be adjusted) on your local machine to port `80` in the container.
- Starts the container named `portfolio_web` in the background.

## 🛠 Installation & Set Up

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   yarn
   ```

4. Start the development server

   ```sh
   npm start
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   npm run serve
   ```

## 🎨 Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#112240](https://via.placeholder.com/10/0a192f?text=+) `#112240` |
| Lightest Navy  | ![#233554](https://via.placeholder.com/10/303C55?text=+) `#233554` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |
