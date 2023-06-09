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

After activating the virtual environment, you need to run the following command:

```bash
uvicorn main:app --reload
```

This will start the OptSys backend server on `http://localhost:8000`.
