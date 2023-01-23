# Cloudinary Collage Creator

[![CCC Demo Video](https://res.cloudinary.com/yoav-cloud/video/upload/e_accelerate:80,h_600,e_loop/fl_animated,fl_awebp/v1674467123/collages/collage-full-flow-very-short.webp)](https://res.cloudinary.com/yoav-cloud/video/upload/h_1200,e_accelerate:50/v1674459548/collages/collage-full-flow-short.mp4)


## Intro

This application uses the [Collage Generation API](https://cloudinary.com/documentation/image_collage_generation)
from [Cloudinary](https://cloudinary.com) to generate the collage images.

It's main stack was developed with: 

- [React](https://reactjs.org/)
- [Recoil](https://recoiljs.org/)
- [Recoil:Spring](https://github.com/yoavniran/recoil-spring)
- [Styled Components](https://styled-components.com)
- [Material UI](https://mui.com/)
- [React-Uploady](https://react-uploady.org)
- [React-dnd](react-dnd.github.io/)
- [Netlify (functions)](https://www.netlify.com/)
- [Fauna DB](https://fauna.com/)

## Public

Available on https://cld-collage-creator.netlify.app/

## Dev

To develop run:

```bash
    yarn
```

To install deps

Then run:

```bash
    yarn start
```

To start the UI application

In order to run the (Server) Functions locally you need to install:

```bash
npm install -g netlify-cli
```

Then you can start them with: 

```bash
    yarn start:fn
```

