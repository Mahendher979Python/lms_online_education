
import os
from django.core.exceptions import ValidationError
from django.conf import settings


def validate_file_extension(value):
    """
    Validate uploaded file extensions are allowed
    """
    allowed_extensions = {
        # Documents
        '.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx',
        # Images
        '.jpg', '.jpeg', '.png', '.gif', '.webp',
        # Videos
        '.mp4', '.webm', '.avi',
        # Audio
        '.mp3', '.wav',
    }
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in allowed_extensions:
        raise ValidationError(f'File type {ext} is not supported. Allowed types: {", ".join(allowed_extensions)}')


def validate_file_size(value):
    """
    Validate uploaded file size does not exceed limit
    """
    max_size = settings.FILE_UPLOAD_MAX_MEMORY_SIZE  # 10MB default
    if value.size > max_size:
        raise ValidationError(f'File size too large. Maximum allowed size is {max_size / (1024 * 1024):.2f} MB.')
