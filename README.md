This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## HTTPS With Let's Encrypt

This repo supports a single-VPS deployment with Nginx and free HTTPS certificates from Let's Encrypt.

Start the app with your production values:

```bash
NEXTAUTH_SECRET='your_nextauth_secret' \
NEXTAUTH_URL='https://beijingquebec.org' \
docker compose up -d
```

Issue the certificate after your domain points to the VPS:

```bash
CERTBOT_EMAIL='you@example.com' \
CERTBOT_DOMAIN='beijingquebec.org' \
CERTBOT_WWW_DOMAIN='www.beijingquebec.org' \
npm run ssl:issue
```

Restart Nginx so it switches to the HTTPS config:

```bash
docker compose restart nginx
```

Renew later with:

```bash
npm run ssl:renew
```
