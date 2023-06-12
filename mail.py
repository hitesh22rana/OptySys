import smtplib
from email.mime.text import MIMEText

def send_email(sender, password, recipients, subject, message):
    for recipient in recipients:
        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = recipient

        try:
            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(sender, password)
                server.sendmail(sender, recipient, msg.as_string())
            return True
        except smtplib.SMTPException:
            return False


# Example usage
sender = "kodenest.tech@gmail.com"
password = "nxkhlntxzbanbilu"
recipients = ["hitesh22rana@gmail.com", "ghoulbond@gmail.com"]
subject = "Hello"
message = "This is a test email."

result = send_email(sender, password, recipients, subject, message)
if result:
    print("Email sent successfully")
else:
    print("Failed to send email")
