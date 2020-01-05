def check_active(validated_data):
    """
    Check if flag is active is present, otherwise returns False
    """
    return validated_data['is_active'] if 'is_active' in validated_data else False


def check_owner(user, register_user):
    """
    Method defined to check if a register is allowed to active user
    :param user: session user
    :param register_user: register user
    :return: boolean
    """
    if user.is_superuser:
        return True

    return user.id == register_user.id