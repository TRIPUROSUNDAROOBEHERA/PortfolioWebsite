import logging
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

logger = logging.getLogger('apps')


class EmailService:
    """Central service for transactional and system email dispatch."""

    @staticmethod
    def send_templated_email(subject, template_name, context, recipient_list, from_email=None):
        """
        Renders HTML email template with fallback plaintext version.
        """
        from_email = from_email or getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@portfolio.local')
        
        try:
            html_content = render_to_string(template_name, context)
            text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=from_email,
                to=recipient_list if isinstance(recipient_list, list) else [recipient_list]
            )
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)
            logger.info(f"Email successfully sent to: {recipient_list}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {recipient_list}: {str(e)}", exc_info=True)
            return False

    @staticmethod
    def send_raw_email(subject, message, recipient_list, from_email=None):
        """Direct plaintext email dispatch."""
        from_email = from_email or getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@portfolio.local')
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=recipient_list if isinstance(recipient_list, list) else [recipient_list],
                fail_silently=False
            )
            return True
        except Exception as e:
            logger.error(f"Failed to send raw email to {recipient_list}: {str(e)}", exc_info=True)
            return False


def send_contact_email_notification(contact_message):
    """
    Triggers admin email alerts upon public 'Let's Connect' submission.
    """
    subject = f"Portfolio Message: {contact_message.name} - {contact_message.subject or 'New Inquiry'}"
    context = {
        'name': contact_message.name,
        'email': contact_message.email,
        'phone': getattr(contact_message, 'phone', 'N/A'),
        'subject': contact_message.subject,
        'message': contact_message.message,
        'created_at': contact_message.created_at.strftime('%B %d, %Y %I:%M %p') if hasattr(contact_message, 'created_at') else '',
    }
    
    admin_recipient = getattr(settings, 'DEFAULT_FROM_EMAIL', 'admin@portfolio.local')
    
    return EmailService.send_templated_email(
        subject=subject,
        template_name='emails/contact_notification.html',
        context=context,
        recipient_list=[admin_recipient]
    )