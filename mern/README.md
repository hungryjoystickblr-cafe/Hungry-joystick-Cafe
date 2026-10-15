# Hungry Joystick MERN migration candidate

This is a separate React + TypeScript/Vite frontend and Express/Node.js backend, using the MongoDB Node driver. The original Sites application remains live and its data remains in D1. Do not use this candidate for cafe operations until the cutover checks below pass.

## Completed

- Existing cafe UI, pricing, memberships, pause/resume, food selection, split payments, adjustments, paid invoice corrections and matching PDF renderer ported.
- Separate indexed MongoDB collections; mutations load operational data and only the relevant historical invoice/expense, then write changed records in a transaction.
- Request IDs prevent repeated execution of an identical mutation request. Revision checks reject stale edits.
- Incremental refreshes merge recorded changes; unchanged refreshes return 204. Initial load and recovery still read the full history; very large histories need paginated invoice/report APIs before further scaling.
- Pooled database connections, timers based on timestamps, hidden-tab polling suspended, PDF font bytes cached in browser memory.
- Owner login uses scrypt password hashes, random HttpOnly/Secure/SameSite cookies, server-side expiry/logout and login attempt limits. Initial setup requires an ADMIN_SETUP_TOKEN and is disabled when it is missing.

## Provisioned resources

- Vercel project: prj_BYMsuwsz8MsPl9ymHXv2sgGq6eoD
- Atlas project: 6acf6d8a7a170d83e45309ed
- Atlas free cluster: hungry-joystick, AWS Mumbai AP_SOUTH_1
- Vercel function region: bom1
- Database: hungry_joystick
- MONGODB_URI and OWNER_EMAIL configured on Vercel; no credentials are committed.

## GitHub and Vercel deployment

When connecting this repository to Vercel, set the project's **Root Directory** to `mern`. Keep the Vercel build command as `npm run build`; `vercel.json` sets the static output directory to `dist` and routes `/api/*` to the Express function. The build generates `api/index.js`, so that generated bundle is intentionally excluded from Git.

Set `MONGODB_URI` and `OWNER_EMAIL` in the Vercel project's environment variables. For first-time owner setup, also set a fresh `ADMIN_SETUP_TOKEN`, deploy, create the owner password at `/setup`, and then remove the setup token and redeploy. Never put these values in GitHub or in a committed `.env` file.

Use a preview/staging deployment until the database network-access and cutover checks below are complete. A successful Vercel build does not establish MongoDB connectivity or make this candidate ready for production cafe operations.

## Blockers and cutover

Atlas currently has no allowed network sources. Automatic approval review rejected a 0.0.0.0/0 rule because it would allow connection attempts from the whole internet. Use approved fixed Vercel outbound IPs and allow only those, or obtain explicit user approval for broader connectivity. Do not retry the rejected rule indirectly.

1. Resolve network access. Do not infer that creating the cluster proves connectivity.
2. Set a fresh ADMIN_SETUP_TOKEN securely in Vercel, redeploy, and have the owner create a password at /setup. Remove the setup token afterward. Never commit passwords or tokens.
3. Test database transactions, concurrent starts on one station, competing checkout, request retries, membership balances, auth/session expiry, split amounts and rollback on failed edits.
4. Export the complete current D1 record with its revision while writes are stopped. Store the backup securely; reject any truncated connector export. Run scripts/import-snapshot.ts against an empty target. The script intentionally refuses targets with business activity.
5. Verify all record counts, invoice totals, active start/pause times and membership balances. Keep the D1 backup for rollback; do not allow simultaneous writes in both apps.
6. Load-test realistic network requests on a staging database. The existing local 200-session test checks calculations only. It does not establish simultaneous capacity, database latency or frontend responsiveness. Decide cluster sizing from measured p50/p95/p99 latency and errors.
7. Only then switch the cafe to Vercel. No production cutover has occurred.

## Local checks

npm ci
npm run build
npx tsc --noEmit
npm test

The test covers 200 started, paused, resumed and billed sessions, split payments, duplicate checkout rejection, and single-record patches. A 321ms local run is a computation check, not an end-to-end performance claim.
