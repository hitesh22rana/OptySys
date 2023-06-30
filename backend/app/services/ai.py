# Purpose: AI Service to handle AI related tasks
# Path: backend/app/services/ai.py

import re

import requests
from bardapi import Bard

from app.config import settings


class AiService:
    session: requests.Session = None
    bard: Bard = None
    cover_letter_compiler: re.Pattern = None
    token: str = settings.bard_token

    @classmethod
    def __init__(cls):
        cls._make_session()

    @classmethod
    def _make_session(cls):
        if not cls.session:
            cls.session = requests.Session()
            cls.session.headers = {
                "Host": "bard.google.com",
                "X-Same-Domain": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.4472.114 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Origin": "https://bard.google.com",
                "Referer": "https://bard.google.com/",
            }
            cls.token = settings.bard_token
            cls.session.cookies.set("__Secure-1PSID", cls.token)
            cls.bard = Bard(token=cls.token, session=cls.session, timeout=30)
            cls.cover_letter_compiler = re.compile("Dear Hiring Manager")

    @classmethod
    def clean_cover_letter(cls, output):
        match = cls.cover_letter_compiler.search(output)

        if match:
            output = output[match.start() :]

        return output

    @classmethod
    async def generate_cover_letter(cls, role, about):
        cls._make_session()

        output: str = cls.bard.get_answer(
            f"""Write a cover letter for the following role:- {role}. The cover letter should be 300 words long and should highlight my creativity, and should include the following information about me:- {about}."""
        )["content"]

        return cls.clean_cover_letter(output)


ai_service = AiService()
