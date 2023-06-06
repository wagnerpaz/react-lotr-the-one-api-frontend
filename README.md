# TOTR - The One API Implementation

## Techs Used

- **Next.js**: I chose to use Next.js because of the opportunity that this project offers for the generation of static pages, which in itself is one of the many SEO improvements that Next.js has to offer. However, due to time constraints, this project is a SPA with client-side data fetching.
- **React.js**: It's my main front-end framework for the past 3 years.
- **Tailwind CSS**: I use it because it offers an awesome development experience and is extremely lightweight due to its purge features, which eliminate all unused CSS. Also there's no javacript need.
- **TypeScript**: Makes project's more maintainable
- **react-infinite-scroller**: Avoid's large DOMs and makes pagination easier.
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
NEXT_PUBLIC_THE_ONE_API_BASE_URL=
NEXT_PUBLIC_THE_ONE_API_ACCESS_TOKEN=
NEXT_PUBLIC_TMDB_API_BASE_URL=
NEXT_PUBLIC_TMDB_API_KEY=
```

Next, to start the dev server:

```
npm run dev
```

- Now just access `http://localhost:3000`
