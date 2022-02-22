# LiRC572 Wallpaper

This is a web based wallpaper for Wallpaper Engine, built with Next.js, Chakra UI, Framer Motion and D3.js.

## Getting Started

Install dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Importing to Wallpaper Engine

First, generate static files:

```bash
yarn build
```

Follow [this guide](https://docs.wallpaperengine.io/en/web/first/gettingstarted.html) to import the generated files to Wallpaper Engine (select index.html).

The last step would make a copy of the generated files in the `wallpaper_engine\projects\myprojects\` folder. The next time you make changes to the project, you can simply copy the out folder content to that project folder and re-apply the changes in the Wallpaper Engine editor.
