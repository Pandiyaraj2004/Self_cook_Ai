# SelfCook AI

> A recipe-discovery prototype connecting food images, recipe search, nutrition pages, and user accounts.

**Node.js · Express · MySQL · Handlebars · Puppeteer · JavaScript**

## The idea

Start with a food image, identify possible food names, and use those terms to retrieve recipes and ingredient information. The project combines a browser interface, an Express server, account handling, and third-party integrations.

## Implemented workflow

```text
Image upload → external image host → public image URL
             → Express /predict → Google Lens page via Puppeteer
             → candidate food terms → Edamam recipe search → recipe cards
```

- Registration and login use MySQL, bcrypt, JWTs, and cookies.
- Handlebars templates provide account pages.
- Static pages cover recipe discovery and nutrition.
- Puppeteer extracts text from the Google Lens result page.

## Local setup

```bash
git clone https://github.com/Pandiyaraj2004/Self_cook_Ai.git
cd Self_cook_Ai
npm install
```

Create a local `.env` with the configuration used by the server:

```dotenv
DATABASE_HOST=localhost
DATABASE_USER=your_local_database_user
DATABASE_PASS=your_local_database_password
DATABASE=selfcook
JWT_SECRET=replace_with_a_random_local_secret
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES=1
```

Provision the MySQL database and its `login` table before testing account flows. The controller writes `name`, `email`, and `pass`, but reads uppercase `ID` and `PASS`; reconcile the schema and field casing before expecting login to work. No schema migration is included.

```bash
npm start
```

The server listens at http://localhost:5000.

## Code tour

| Path | Responsibility |
| --- | --- |
| [app.js](app.js) | Express setup, database connection, image-name lookup |
| [controllers/users.js](controllers/users.js) | Account registration, login, session checks |
| [routes](routes) | Account and page routing |
| [public/js/food.js](public/js/food.js) | Image upload and recipe retrieval |
| [views](views) | Handlebars account templates |
| [public/html](public/html) | Food and nutrition interfaces |

## Integration status

This is a prototype with setup work remaining. The browser scripts currently contain provider credentials; rotate them and move credentialed API calls behind the server before deployment. The Google Lens integration depends on external page markup and can break when that page changes. Provider credentials and service availability must be configured independently; adding Edamam values to `.env` alone will not wire them into the current browser code.

The `npm test` script is a placeholder, so it does not represent an automated test suite.

---

Built by **Pandiyaraj A** · [Portfolio](https://pandiyaraj.netlify.app/) · [GitHub](https://github.com/Pandiyaraj2004) · [LinkedIn](https://www.linkedin.com/in/pandiyaraj-a-mca/)
