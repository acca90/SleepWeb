from backend.commons.enumerations import Stages


def get_age_group_by_days_of_life(days):
    """
    Method defined to return the stage (age group) of a patient base on days of life
    """
    if days <= 90:
        return Stages.NEWBORN

    if 365 >= days > 90:
        return Stages.INFANT

    if 730 >= days > 365:
        return Stages.TODDLER

    if 1825 >= days > 730:
        return Stages.PRE_SCHOOLER

    if 4745 >= days > 1825:
        return Stages.SCHOOL_AGED

    if 6205 >= days > 4745:
        return Stages.TEEN

    if 9125 >= days > 6205:
        return Stages.YOUNG

    if 23360 >= days > 9125:
        return Stages.ADULT

    return Stages.OLDER_ADULT
