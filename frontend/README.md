# Frontend (Next.js)

The frontend of OptySys is built using Next.js.

To set up the frontend locally, follow these steps:

1. Install the necessary dependencies:

```shell
npm install
```

2. Start the development server:

```shell
npm run dev
```

3. Open your web browser and visit `http://localhost:3000` to access the OptySys frontend.

## Frontend Structure

- This is a high level design for the frontend of the OptySys
- The design is configured in a hirerchical approach
- Design is divided into two sub parts private routes and public routes

### Public routes

- This includes public routes which are accessible directly
- Public routes had 2 pages
- First is the Home screen
- Other is a page for user authentication which includes signup and login pages

### Private routes

- These are private routes and not accessible directly
- These a routes are available for only authenticated user
- After authentication filling the user details form is necessary for accessing the dashboard
- The user dashboard provides features to the user such as **search** ,**view** and **join organizations**
- User can **view** and **create custom cover letter** for the available oppotunities only in the joined organizations
  <br>
  </br>
  ![Alt text](optySystem.PNG)
