from rest_framework import status
from rest_framework.response import Response


def not_allowed_to_do():
    return Response({
        "Forbidden": "You are not allowed to do it"
    }, status.HTTP_403_FORBIDDEN)


def not_allowed_to_see():
    return Response({
        "Forbidden": "You are not allowed to see it"
    }, status.HTTP_403_FORBIDDEN)

