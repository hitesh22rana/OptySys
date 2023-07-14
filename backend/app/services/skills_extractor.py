# Purpose: Skills Extractor service for extracting skills
# Path: backend/app/services/skills_extractor.py
import en_core_web_sm

from app.constants import technologies


class SkillsExtractor:
    nlp: en_core_web_sm = None

    @classmethod
    def __init__(cls):
        if cls.nlp is None:
            cls.nlp = en_core_web_sm.load()

    @classmethod
    def extract_skills(cls, text: str) -> list:
        # normalizing the text
        text: str = text.strip().lower()

        # processing the text
        nlp_text = cls.nlp(text)

        # removing stop words and implementing word tokenization
        tokens = [token.text for token in nlp_text if not token.is_stop]

        # extracted skillsets
        skills = []

        # check for one-grams (example: python)
        for token in tokens:
            if technologies.contains(token):
                skills.append(token)

        # check for bi-grams and tri-grams (example: machine learning)
        for token in nlp_text.noun_chunks:
            token = token.text.lower().strip().replace(" ", "-")
            if technologies.contains(token):
                skills.append(token)

        return technologies.list_contains(skills)


skill_extractor = SkillsExtractor()
