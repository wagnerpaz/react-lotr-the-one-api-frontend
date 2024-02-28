# The Lord of The Rings - The One API React Frontend Implementation

## Techs Used

- **Next.js**: I chose to use Next.js because of the opportunity that this project offers for the generation of static pages, which in itself is one of the many SEO improvements that Next.js has to offer. However, due to time constraints, this project is a SPA with client-side data fetching.
- **Tailwind CSS**: I use it because it offers an awesome development experience and is extremely lightweight due to its purge features, which eliminate all unused CSS. Also, no javacript is needed
- **TypeScript**: Make projects more maintainable
- **react-infinite-scroller**: Avoids large DOMs and makes pagination easier
- **@headlessui/react**: It has components who sinergyze with Tailwind CSS

## APIs used

- **The One API**: For LOTR data
- **TMDB**: For extracting posters, which are lacking on The One API.

# Installation

```
git clone https://github.com/wagnerpaz/the-lord-of-the-rings-frontend-react-nextjs-tailwindcss.git

cd the-lord-of-the-rings-frontend-react-nextjs-tailwindcss

npm i
```

- Create a `.env` file at project root and provide the secrets:

```
NEXT_PUBLIC_THE_ONE_API_BASE_URL=https://the-one-api.dev/v2
NEXT_PUBLIC_THE_ONE_API_ACCESS_TOKEN=XMhBL73r1d4LXY_EP8Xf
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_API_KEY=6efaf7997ff8f6c3545d16cf9321f85b
```

Next, to start the dev server:

```
npm run dev
```

- Now just access `http://localhost:3000`
