from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

"""FastAPI Instance"""
app = FastAPI()

"""MiddleWare"""
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

"""GET Method - Root"""


@app.get("/")
async def docs_redirect():
    return RedirectResponse(url="/docs")
