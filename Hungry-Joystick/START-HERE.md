# Hungry Joystick source code

Includes the complete original application and MERN application, including station deletion and the PostCSS build fix pushed as GitHub commit 788f548.

## MERN app
Use the mern folder for Vercel.
- Framework: Vite
- Root Directory: mern
- Build Command: npm run build
- Output Directory: dist

Local commands:
```sh
cd mern
npm ci
npm run build
npm test
```

See mern/README.md for server environment and owner setup instructions. Credentials, customer database contents and node_modules are excluded. Configure server secrets separately.

## Current deployment status
The build fix passed local build and billing-operation checks. Vercel shows a Ready production build, but the reported live URL returns 404; hosting troubleshooting is not yet complete. This ZIP does not imply the live deployment works.

GitHub: https://github.com/hungryjoystickblr-cafe/Hungry-joystick
