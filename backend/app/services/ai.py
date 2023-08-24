# Purpose: AI Service to handle AI related tasks
# Path: backend/app/services/ai.py

import re

import requests
from bardapi import SESSION_HEADERS, Bard

from app.config import settings
from app.logger import logger
from app.services.email import email_service


class AiService:
    session: requests.Session = None
    bard: Bard = None
    cover_letter_compiler: re.Pattern = None

    token_1psid: str = settings.bard_token_1psid
    token_1psidcc: str = settings.bard_token_1psidcc
    token_1psidts: str = settings.bard_token_1psidts

    @classmethod
    def __init__(cls):
        cls._make_session()

    @classmethod
    def _make_session(cls):
        if cls.session is not None:
            return

        try:
            cls.session = requests.Session()
            cls.session.headers = SESSION_HEADERS
            cls.session.cookies.set("__Secure-1PSID", cls.token_1psid)
            cls.session.cookies.set(
                "__Secure-1PSIDCC",
                cls.token_1psidcc,
            )
            cls.session.cookies.set(
                "__Secure-1PSIDTS",
                cls.token_1psidts,
            )
            cls.bard = Bard(token=cls.token_1psid, session=cls.session, timeout=30)
            cls.cover_letter_compiler = re.compile("Dear Hiring Manager")

        except Exception as e:
            logger.error(f"Error: {e}")

    @classmethod
    def clean_cover_letter(cls, output):
        match = cls.cover_letter_compiler.search(output)

        if match:
            output = output[match.start() :]

        return output.strip()

    @classmethod
    def generate_cover_letter(cls, about, role):
        cls._make_session()

        try:
            output: str = cls.bard.get_answer(
                f"""Write a cover letter for the following:- {str(role)}. The cover letter should be 300 words long and should highlight my creativity, and should include the following information about me:- {str(about)}. Output should only contain the cover letter that is should start from Dear Hiring Manager, and should end by formal greetings."""
            )["content"]

            cover_letter: str = cls.clean_cover_letter(output)

            email = about["email"]
            subject = "✨Personalized Cover letter✨"
            title = f"Cover Letter for {role['title']} at {role['company']}"

            email_service.send_cover_letter(email, subject, title, cover_letter)

        except Exception as e:
            logger.error(f"Error: {e}")


ai_service = AiService()
