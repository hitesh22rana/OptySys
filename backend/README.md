# Backend (FastAPI)

The backend of OptySys is built using FastAPI.

## Installation

To install the backend, you need to have Python 3.11+ installed on your system. You can download it from the official website.

After installing Python, you need to install the dependencies. To do so, run the following command in the root directory of the project:

```bash
virtualenv venv --python=python3.11
```

This will create a virtual environment named `venv` in the root directory of the project. To activate the virtual environment, run the following command:

For Linux/MacOS users:-

```bash
source venv/bin/activate
```

For Windows users:-

```shell
source venv\Scripts\activate
```

After activating the virtual environment, you need to install the dependencies. To do so, run the following command:

```bash
pip install -r requirements.txt
```

## Running the backend

After activating the virtual environment, you need to add environment variables. To do so, create a file named `.env` in the root directory of the project and add the following environment variables:

```env
MONGODB_URI="<MONGODB_URI>"
PROJECT_NAME="OptySys"
PROJECT_DESCRIPTION="Opportunity management system."
PROJECT_VERSION="1.0.0"
DEBUG=true
JWT_SECRET="secret"
JWT_ALGORITHM="HS256"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USERNAME="<your_email>"
SMTP_PASSWORD="<your_password>"
BARD_TOKEN="<your_bard_token>"
```

After adding the environment variables, you can run the backend using the following command:

```bash
uvicorn app.main:app --reload
```

This will start the OptySys backend server on `http://localhost:8000`.
