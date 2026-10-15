# Hungry Joystick Cafe

The MERN/Vite deployment candidate is in [`mern/`](./mern/), with a React and TypeScript frontend, an Express API, and MongoDB.

## Deploy to Vercel

Import this GitHub repository into Vercel and set **Root Directory** to `mern`. The build command, output directory, API routing, and Mumbai function region are configured in `mern/vercel.json`.

Configure `MONGODB_URI` and `OWNER_EMAIL` as Vercel environment variables. For initial owner setup, temporarily set a fresh `ADMIN_SETUP_TOKEN`, deploy, create the owner password at `/setup`, then remove the token and redeploy. Never commit credentials or `.env` files.

**Production warning:** MongoDB network access and the documented data migration/cutover checks are not complete. Use staging until those checks pass. See [`mern/README.md`](./mern/README.md) for setup, verification, and cutover details.
