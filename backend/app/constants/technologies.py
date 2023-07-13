import csv


class Technologies:
    technologies: list = []

    @classmethod
    def __init__(cls):
        pass

    @classmethod
    def get_technologies_list(cls) -> list:
        if cls.technologies == []:
            with open("app/constants/technologies.csv", "r") as file:
                reader = csv.reader(file)
                cls.technologies = list(reader)[0]

        return cls.technologies


technologies = Technologies()
