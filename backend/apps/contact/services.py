import logging
import threading
from django.conf import settings
from django.core.mail import send_mail
from apps.notifications.models import Notification

logger = logging.getLogger('apps')


def get_client_ip(request):
    """
    Extract sender's real IP address from HTTP request headers.
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '')


def _deliver_email_worker(subject, body, from_email, recipient):
    """
    Background worker that conducts the slow SMTP network handshake
    without holding up the frontend response.
    """
    try:
        sent = send_mail(
            subject=subject,
            message=body,
            from_email=from_email,
            recipient_list=[recipient],
            fail_silently=False,
        )
        logger.info(f"Background SMTP delivery to {recipient} succeeded (Sent: {sent})")
    except Exception as exc:
        logger.error(f"Background SMTP delivery failed: {exc}")


def send_contact_email_notification(contact_message):
    """
    1. Instantly creates the Admin Notification record for real-time dashboard tracking.
    2. Spawns an async worker thread for Gmail SMTP delivery to avoid latency.
    """
    sender_name = getattr(contact_message, 'name', 'Website Visitor')
    sender_email = getattr(contact_message, 'email', 'Not provided')
    sender_msg = getattr(contact_message, 'message', '')
    sender_ip = getattr(contact_message, 'ip_address', 'Unknown')
    created_time = getattr(contact_message, 'created_at', None)
    time_str = created_time.strftime('%Y-%m-%d %H:%M:%S') if created_time else 'Just now'

    # ─── 1. Instant In-App Admin Notification ───
    try:
        Notification.objects.create(
            title=f"New Contact Message from {sender_name}",
            message=f"{sender_name} ({sender_email}) wrote: {sender_msg[:120]}...",
            is_read=False,
        )
        logger.info(f"Admin notification saved for message ID #{getattr(contact_message, 'id', 'new')}")
    except Exception as notif_err:
        logger.warning(f"Failed to record in-app notification: {notif_err}")

    # ─── 2. Prepare Email Body ───
    recipient = getattr(settings, 'EMAIL_HOST_USER', 'sramkumar0101@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', f"Portfolio Administration <{recipient}>")
    subject = f"[Portfolio Contact] New message from {sender_name}"

    body = (
        f"You have received a new contact submission from your Portfolio Website:\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"Sender Name  : {sender_name}\n"
        f"Sender Email : {sender_email}\n"
        f"IP Address   : {sender_ip}\n"
        f"Received At  : {time_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"Message:\n"
        f"{sender_msg}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"View all messages in Django Admin: http://127.0.0.1:8000/admin/contact/contactmessage/"
    )

    # ─── 3. Non-Blocking Async Dispatch ───
    thread = threading.Thread(
        target=_deliver_email_worker,
        args=(subject, body, from_email, recipient),
        daemon=True,
    )
    thread.start()