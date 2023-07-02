# Purpose: Mail service to send emails to users
# Path: backend/app/services/email.py

import html
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi.templating import Jinja2Templates

from app.config import settings
from app.logger import logger


class EmailService:
    smtp_server = settings.smtp_host
    smtp_port = settings.smtp_port
    sender = settings.smtp_username
    password = settings.smtp_password
    templates = Jinja2Templates(directory="app/templates")
    otp_template = "otp.html"
    cover_letter_template = "cover_letter.html"
    server = None

    @classmethod
    def __init__(cls):
        cls._login()

    @classmethod
    def _login(cls):
        try:
            if not cls.server:
                cls.server = smtplib.SMTP(cls.smtp_server, cls.smtp_port)
                cls.server.starttls()
                cls.server.login(cls.sender, cls.password)

        except smtplib.SMTPException as e:
            logger.error(f"SMTP Error: {e}")

        except Exception as e:
            logger.error(f"Error: {e}")

    @classmethod
    def send_otp(cls, recipient, subject, otp):
        template = cls.templates.get_template(cls.otp_template)
        rendered = template.render(otp=otp)

        cls.send_email_to_user(recipient, subject, rendered)

    @classmethod
    def send_cover_letter(cls, recipient, subject, title, cover_letter):
        template = cls.templates.get_template(cls.cover_letter_template)
        rendered = template.render(title=title, cover_letter=cover_letter)

        cls.send_email_to_user(recipient, subject, rendered)

    @classmethod
    def send_email_to_user(cls, recipient, subject, message):
        cls._login()

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = cls.sender
            msg["To"] = recipient

            # Escape the escape sequences and create an HTML MIMEText object and set the encoding to UTF-8
            message = message.strip().replace("\n", "<br>")
            html_content = MIMEText(message, "html", "utf-8")
            msg.attach(html_content)

            cls.server.sendmail(cls.sender, recipient, msg.as_string())

        except smtplib.SMTPException as e:
            logger.error(f"SMTP Error: {e}")

        except Exception as e:
            logger.error(f"Error: {e}")


email_service = EmailService()
