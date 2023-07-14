import csv


class Technologies:
    technologies: set = set()

    @classmethod
    def __init__(cls) -> None:
        if not cls.technologies:
            cls.load_technologies()

    @classmethod
    def load_technologies(cls) -> None:
        with open("app/constants/technologies.csv", "r") as file:
            reader = csv.reader(file)
            cls.technologies = set(list(reader)[0])

    @classmethod
    def get_technologies_list(cls) -> list:
        return list(cls.technologies)

    @classmethod
    def contains(cls, technology: str) -> bool:
        return technology in cls.technologies

    @classmethod
    def list_contains(cls, technologies: list) -> list:
        return list(
            set(technology for technology in technologies if cls.contains(technology))
        )


technologies = Technologies()
