# Barkarian

## S3 Starter Template with User Roles\_

This is a starter template that takes advantage of SvelteKit,Superforms and Skeleton UI toolkit it also uses AuthJS JWTs based authentication and supports user roles (each user can have many roles).
New users are prompted to "auth/new-user" and they complete all of their necessary informations in order for them to be inserted to the database.
When a user is inserted he get the role "user" and the admin can see them from his Admin dashboard and modify their roles add or remove them,status and other infos.
The first admin's email is specified from the related .env variable. You can check roles in order to build all kinds of applications.
The project is deployable as it is to all of the serverless infrastructures like Vercel,Netlify etc. although it whould need a database url (I used Planetscale for that).

- ⚡S1:Uses Skeleton UI toolkit
- ⚡S2:Takes advantage of Superforms
- ⚡S3:Uses Sveltekit
- Google oauth
- Easy authentication and role management
- New users are prompted to a new-user page in order to put all their necessary meta-data
- use whatever database you like(Your own or any other Serverless platform)
- Easily deploy it on Netlify or Vercel,make it also easily deployable,scalable and cost effective

## Getting started

To get started with this project, simply download or clone the repository, and install the dependencies by running the following command in your terminal:

```sh
npm install
```

Next, you will need to create a .env file in the root of the project with the following variables:

```sh
PUBLIC_GOOGLE_ID=<DATA>
SECRET_GOOGLE_SECRET=<DATA>
SECRET_AUTH_SECRET=<DATA>
SECRET_ADMIN_EMAIL=<DATA>
PUBLIC_DEFAULT_LIMIT="10"

--Attention! If you use planetscale add sslaccept parameter (as shown below) at the end of the database url
SECRET_DATABASE_URL=<mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict>
```

After the .env file is set up, run the following command to start the development server:

- push schema to the database and generate client

```sh
npx prisma generate
npx prisma db push
```

- start the sveltekit application

```sh
npm run dev
```

This will start the server and launch the application in your browser. You can then make changes to the code and see the changes reflected in real-time.

## Usage

This starter template includes a simple UI and some example routes that showcase how easy it is to work with this as a starting template. The code that is responsible for authentication both serverside and frontend is located in the auth folder, and some small pieces are inside hook.server.ts and the layout layer of the src root folder.

## Prisma Planetscale Commands

```sh
--format prisma file
npx prisma format
--generate the prismaClient and it's types
npx prisma generate
--don't use migrate for Planetscale-instead:
npx prisma db push
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This starter template is based on the SvelteKit starter template and uses Superforms and SkeletonUI.
