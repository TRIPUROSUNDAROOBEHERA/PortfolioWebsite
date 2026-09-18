# System-wide Status Codes & Labels
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 100

# File Upload Limits
MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif')
ALLOWED_DOCUMENT_EXTENSIONS = ('.pdf', '.doc', '.docx', '.zip')

# Timeouts & Cache Keys
CACHE_TTL_PROFILE = 60 * 15  # 15 minutes
CACHE_TTL_SETTINGS = 60 * 30  # 30 minutes
CACHE_TTL_PROJECTS = 60 * 10  # 10 minutes

# Standard Error & Success Messages
MSG_SUCCESS = "Operation completed successfully."
MSG_CREATED = "Resource created successfully."
MSG_UPDATED = "Resource updated successfully."
MSG_DELETED = "Resource deleted successfully."
MSG_NOT_FOUND = "The requested resource was not found."
MSG_PERMISSION_DENIED = "You do not have permission to perform this action."