from random import randint

from passlib.context import CryptContext


class Hasher:
    @classmethod
    def __init__(cls):
        cls.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def get_otp(cls):
        return str(randint(100000, 999999))

    @classmethod
    def verify_password(cls, plain_password, hashed_password):
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def get_password_hash(cls, password):
        return cls.pwd_context.hash(password)
