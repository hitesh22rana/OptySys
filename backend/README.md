# Backend (FastAPI)

The backend of OptySys is built using FastAPI.

## Installation

To install the backend, you need to have Python 3.11+ installed on your system. You can download it from the official website.

After installing Python, you need to install the dependencies. To do so, run the following command in the root directory of the project:

```bash
virtualenv venv --python=python3.11
```

This will create a virtual environment named `venv` in the root directory of the project. To activate the virtual environment, run the following command:

For Linux/MacOS users:

```bash
source venv/bin/activate
```

For Windows users:

```shell
source venv\Scripts\activate
```

After activating the virtual environment, you need to install the dependencies. To do so, run the following command:

```bash
pip install -r requirements.txt
```

## Running the backend

After activating the virtual environment, you need to add environment variables. To do so, create a file named `.env` under the backend directory of the project and add the following environment variables:

**Note: Important Consideration**

As we are leveraging MongoDB transactions in our project, it is crucial to highlight that the local MongoDB instance does not support transactions. The transactional capabilities are exclusively available in the cloud version of MongoDB. Therefore, it is imperative to utilize the cloud version of MongoDB to ensure seamless functionality and proper utilization of transactions within the project.

```env
MONGODB_URI="<MONGODB_URI>"
PROJECT_NAME="OptySys"
PROJECT_DESCRIPTION="Streamlining opportunities with efficient matching and automation."
PROJECT_VERSION="1.0.0"
DEBUG=true
JWT_SECRET="secret"
JWT_ALGORITHM="HS256"
TOKEN_EXPIRY_TIME=6
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USERNAME="<email>"
SMTP_PASSWORD="<password>"
BARD_TOKEN_1PSID="<bard_token_1psid>"
BARD_TOKEN_1PSIDCC="<bard_token_1psidcc>"
BARD_TOKEN_1PSIDTS="<bard_token_1psidts>"
REDIS_HOST="<redis_host_url>"
REDIS_PORT="<redis_port>"
REDIS_PASSWORD="<redis_password>"
FRONTEND_BASE_URL="http://localhost:3000"
ALLOWED_ORIGINS='["http://localhost:3000"]'
```

If you are using Redis locally, set the `REDIS_HOST` to `localhost`. If you want to run Redis using Docker, use the following command to start Redis on port `6379:6379`:

```bash
docker run -p 6379:6379 redis
```

After adding the environment variables, you can run the backend using the following command:

```bash
uvicorn app.main:app --reload
```

This will start the OptySys backend server on `http://localhost:8000`.

## Running the project with Docker Compose

If you prefer to run the entire project using Docker Compose, you can use the following command:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will start all the necessary services, including the backend, MongoDB, and Redis, defined in the `docker-compose.yml` file.

You can access the OptySys backend server on `http://localhost:8000`.

Make sure to replace `<MONGODB_URI>`, `<email>`, `<password>`, `<bard_token_1psid>`, `bard_token_1psidcc`, `bard_token_1psidts`, `<redis_host_url>`, `<redis_port>`, and `<redis_password>` with the actual values corresponding to your setup.

Let me know if you need any further assistance!
