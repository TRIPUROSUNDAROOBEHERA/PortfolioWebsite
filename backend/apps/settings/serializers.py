from rest_framework import serializers
from .models import SiteSetting


class SiteSettingSerializer(serializers.ModelSerializer):
    """Full Site Setting Serializer for Admin Panel configuration."""
    logo_image_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    og_image_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetting
        fields = [
            'id',
            'site_name',
            'logo_initials',
            'logo_image',
            'logo_image_url',
            'favicon',
            'favicon_url',
            'meta_title',
            'meta_description',
            'meta_keywords',
            'og_image',
            'og_image_url',
            'footer_copyright',
            'footer_credit',
            'privacy_policy',
            'terms_conditions',
            'enable_contact_form',
            'enable_public_resume_download',
            'maintenance_mode',
            'google_analytics_id',
            'updated_at',
        ]
        read_only_fields = ['id', 'updated_at']

    def get_logo_image_url(self, obj):
        request = self.context.get('request')
        if obj.logo_image:
            return request.build_absolute_uri(obj.logo_image.url) if request else obj.logo_image.url
        return None

    def get_favicon_url(self, obj):
        request = self.context.get('request')
        if obj.favicon:
            return request.build_absolute_uri(obj.favicon.url) if request else obj.favicon.url
        return None

    def get_og_image_url(self, obj):
        request = self.context.get('request')
        if obj.og_image:
            return request.build_absolute_uri(obj.og_image.url) if request else obj.og_image.url
        return None


class PublicSiteSettingSerializer(serializers.ModelSerializer):
    """Publicly exposed branding, footer, and SEO configuration."""
    logo_image_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    og_image_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetting
        fields = [
            'site_name',
            'logo_initials',
            'logo_image_url',
            'favicon_url',
            'meta_title',
            'meta_description',
            'meta_keywords',
            'og_image_url',
            'footer_copyright',
            'footer_credit',
            'enable_contact_form',
            'enable_public_resume_download',
            'maintenance_mode',
            'google_analytics_id',
        ]

    def get_logo_image_url(self, obj):
        request = self.context.get('request')
        if obj.logo_image:
            return request.build_absolute_uri(obj.logo_image.url) if request else obj.logo_image.url
        return None

    def get_favicon_url(self, obj):
        request = self.context.get('request')
        if obj.favicon:
            return request.build_absolute_uri(obj.favicon.url) if request else obj.favicon.url
        return None

    def get_og_image_url(self, obj):
        request = self.context.get('request')
        if obj.og_image:
            return request.build_absolute_uri(obj.og_image.url) if request else obj.og_image.url
        return None