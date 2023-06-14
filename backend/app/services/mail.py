# path: backend/app/services/mail.py

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException, status

from app.config import settings


class MailService:
    smtp_server = settings.smtp_host
    smtp_port = settings.smtp_port
    sender = settings.smtp_username
    password = settings.smtp_password
    server = None

    @classmethod
    def _login(cls):
        try:
            if not cls.server:
                cls.server = smtplib.SMTP(cls.smtp_server, cls.smtp_port)
                cls.server.starttls()
                cls.server.login(cls.sender, cls.password)

            return cls.server

        except smtplib.SMTPException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to login to SMTP server",
            ) from e

    @classmethod
    def send_email_to_user(cls, recipient, subject, message):
        if not cls.server:
            cls._login()

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = cls.sender
            msg["To"] = recipient

            msg.attach(MIMEText(message, "html"))

            cls.server.sendmail(cls.sender, recipient, msg.as_string())

        except smtplib.SMTPException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to send email",
            ) from e


mail_service = MailService()