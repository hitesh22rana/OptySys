# Purpose: Skills Extractor service for extracting skills
# Path: backend/app/services/skills_extractor.py
import en_core_web_sm
from newspaper import Article

from app.constants import technologies


class SkillsExtractor:
    supported_sites = ["linkedin", "internshala"]
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

    @classmethod
    def extract_data_from_link(cls, url: str, site: str):
        if site not in cls.supported_sites or url.find(site) == -1:
            raise Exception("Error: Website not supported")

        try:
            article = Article(url)
            article.download()
            article.parse()

            title: str = article.title
            description: str = article.text.replace("\n\n", "\n")
            skills: list = cls.extract_skills(description.replace("\n", ""))

            if description == "" or skills == []:
                raise Exception("Error: Unable to extract data")

            return {
                "title": title,
                "url": url,
                "description": description,
                "skills": skills,
            }

        except Exception as e:
            raise Exception("Error: Unable to extract data") from e


skill_extractor = SkillsExtractor()
