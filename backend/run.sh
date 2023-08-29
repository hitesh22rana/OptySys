#!/bin/bash

# Activate the virtual environment
source venv/Scripts/activate

# Run the FastAPI app
uvicorn app.main:app --reload