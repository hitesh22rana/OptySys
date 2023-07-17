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

## Structure

- This is a high level design for the frontend.
- The design is configured in a hirerchical approach.
- Design is divided into two sub parts:-
    1. [Public Routes](#public-routes)
    2. [Private Routes](#private-routes)

### Public routes

- These routes are publicly accessible by any user.
- Public routes includes:-
  - Home Screen
  - Authentication
    - Login
    - Signup

### Private routes

- These routes are not publicly accessible only authenticated and authorized users can access.
- Authenticated users have to fill the user detail form, in order to further activate their account, which is strictly required for automating the process.
- Only activated users can access the dashboard.
- Private routes includes:-
  - User details form
    - DashBoard
      - Sidebar
        - Joined organizations
          - Publish opportunities
        - Available opportunities
          - View opportunities
            - Custom cover-letter
      - Topbar
        - Searchbar
        - Notifications
        - Settings
        - Logout
      - Organizations
        - View organization page
          - join organization

![frontend-architecture](../.github/images/frontend-architecture.png)
