# Boba Workshop Dashboard

Track and manage Hack Club Boba Drop workshops. Learn more and start your own at [boba.hackclub.com](https://boba.hackclub.com).

## Local Development

### 1. Clone the repo

```bash
git clone https://github.com/MntRushmore/boba-workshop-dashboard
cd boba-workshop-dashboard
yarn install
```

### 2. Env variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `HACKCLUB_CLIENT_ID` | Hack Club OAuth app client ID, register an example app at `auth.hackclub.com` |
| `HACKCLUB_CLIENT_SECRET` | Hack Club OAuth app client secret |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `NEXTAUTH_SECRET` | Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `AIRBRIDGE_API_KEY` | Airtable PAT with access to the Boba Club Dashboard base - get from a Boba organizer (or go through hell seting up a localhost) |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook for grant request notifications |
| `NEXT_PUBLIC_ADMIN_SLACK_IDS` | Comma-separated Slack member IDs for admin access |

**Getting your Slack ID:** In Slack, click your profile picture → **Profile** → **...** → **Copy member ID**.

**OAuth redirect URI:** When registering the Hack Club OAuth app, set the redirect URI to:
```
http://localhost:3000/api/auth/callback/hackclub
```

### 3. Run

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).
