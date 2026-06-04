# Kistlboard CMS Mini

This repository contains the CMS / backend part of **Kistlboard Mini**.

Kistlboard Mini is a small, self-hostable version of Kistlboard.
The CMS is used to manage the content that is displayed by the web app.

This repository is part of the full Kistlboard Mini setup:

* **Kistlboard CMS Mini** – backend / CMS
* **Kistlboard Web Mini** – frontend / web app

For the full project setup, please check the main `Kistlboard-Mini` repository.

---

## Requirements

Before starting the project, make sure you have the following installed:

* Node.js
* pnpm
* Podman/Docker - for database
* Git

The CMS also requires a local PostgreSQL database.

---

## Local Setup

### 1. Clone the Repository

If you are using this repository directly:

```bash
git clone https://github.com/YOUR-USERNAME/Kistlboard-CMS-Mini.git
cd Kistlboard-CMS-Mini
```

If you cloned the full `Kistlboard-Mini` repository with submodules, change into the CMS folder instead:

```bash
cd cms
```

---

### 2. Install Dependencies

```bash
pnpm install
```

---

### 3. Start the Local Database

The database is not included directly in this repository.

The CMS requires a PostgreSQL database. You can either run PostgreSQL with Docker/Podman or install PostgreSQL directly on your system.
This documentation uses Podman for the local development setup.

For local development, you can start a PostgreSQL database with Podman:

```bash
podman run --name kistlboard-mini-db \
  -e POSTGRES_USER=kistlboard \
  -e POSTGRES_PASSWORD=kistlboard \
  -e POSTGRES_DB=cms \
  -p 5432:5432 \
  -d postgres:16
```

If the database container already exists, start it again with:

```bash
podman start kistlboard-mini-db
```

To stop the database:

```bash
podman stop kistlboard-mini-db
```

To remove the database container completely:

```bash
podman rm kistlboard-mini-db
```

> Note: Removing the database container will delete the local database data unless you are using a persistent volume.

---

### 4. Create the Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Then make sure your `.env` contains the following values:

```env
# Important: required for auth, sessions, tokens, etc.
# Please replace this with your own random value later.
PAYLOAD_SECRET=thisIsTheSecretKeyForThePayloadApp

# Database connection
DATABASE_URI=postgres://kistlboard:kistlboard@localhost:5432/cms
DATABASE_URL=postgres://kistlboard:kistlboard@localhost:5432/cms
```

Some projects expect `DATABASE_URI`, others expect `DATABASE_URL`.
Both are included here to make local setup easier.

> Important: Do not use the example `PAYLOAD_SECRET` in production. Replace it with your own secure random value.

---

### 5. Start the Development Server

```bash
pnpm dev
```

After the server has started, open:

```text
http://localhost:3000
```

The Payload admin panel is usually available at:

```text
http://localhost:3000/admin
```

On the first start, follow the on-screen instructions to create your first admin user.

---

## Project Structure

```text
Kistlboard-CMS-Mini/
├── src/              # CMS source code
├── public/           # Public assets
├── .env.example      # Example environment variables
├── package.json      # Project scripts and dependencies
└── README.md
```

---

## Available Scripts

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Start the production build:

```bash
pnpm start
```

---

## Database Notes

This project uses PostgreSQL for local development.

The default local database settings are:

```text
Host: localhost
Port: 5432
Database: cms
User: kistlboard
Password: kistlboard
```

These values are intended for local development only.

For production, please use secure credentials and a properly configured PostgreSQL database.

---

## Security Notes

Before making changes public or deploying this project, make sure that:

* `.env` is not committed
* real secrets are not committed
* production database credentials are not committed
* `PAYLOAD_SECRET` is changed to a secure random value
* local development passwords are not reused in production

---

## Deployment

This repository only contains the CMS part of Kistlboard Mini.

For a full deployment, you also need:

* a running PostgreSQL database
* this CMS application
* the Kistlboard Web Mini frontend
* the correct environment variables for both projects

Please check the main `Kistlboard-Mini` repository for the full project overview.

---

## License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.

---

## Author

Created by **Contentkistl / StreiblV**.
