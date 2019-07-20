def check_active(validated_data):
    """
    Check if flag is active is present, otherwise returns False
    """
    return validated_data['is_active'] if 'is_active' in validated_data else False
