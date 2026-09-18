from django.db import models


class ContactMessage(models.Model):
    """
    Contact Message Model mapped directly to:
    - Public UI: "Let's Connect" form (Name, Email, Message)
    - Admin Panel: Messages Inbox (Read/Unread, Archive, IP Tracking)
    """
    name = models.CharField(
        max_length=120,
        help_text="Sender's name"
    )
    email = models.EmailField(
        help_text="Sender's contact email"
    )
    subject = models.CharField(
        max_length=200,
        blank=True,
        default="Portfolio Inquiry",
        help_text="Message subject line"
    )
    message = models.TextField(
        help_text="Inquiry content"
    )
    is_read = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Read status in Admin dashboard"
    )
    is_archived = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Archived status"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="Sender IP for spam and security tracking"
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
        ordering = ['-created_at']

    def __str__(self):
        timestamp = self.created_at.strftime('%Y-%m-%d %H:%M') if self.created_at else 'Unsaved'
        return f"Message from {self.name} ({self.email}) - {timestamp}"

    def save(self, *args, **kwargs):
        # Guarantee fallback default if an empty string or whitespace is submitted
        if not self.subject or not self.subject.strip():
            self.subject = "Portfolio Inquiry"
        else:
            self.subject = self.subject.strip()
        super().save(*args, **kwargs)