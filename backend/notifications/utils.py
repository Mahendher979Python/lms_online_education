from .models import Notification


def send_notification(
    recipient,
    sender,
    notif_type,
    message,
    course_name=None,
    progress=None
):

    # Save notification in database
    notification = Notification.objects.create(
        recipient=recipient,
        sender=sender,
        type=notif_type,
        message=message,
        course_name=course_name,
        progress=progress
    )

    return notification