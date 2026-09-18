from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Full Profile Serializer for public frontend rendering and admin updates."""
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'first_name',
            'last_name',
            'badge_title',
            'badge_subtitle',
            'headline',
            'hero_description',
            'about_text',
            'about_detailed_text',
            'about_image',
            'email',
            'phone',
            'location',
            'is_available',
            'years_of_learning',
            'total_projects',
            'total_certificates',
            'courses_completed',
            'hours_of_coding',
            'avatar',
            'resume',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'instagram_url',
            'updated_at',
        ]
        read_only_fields = ['id', 'updated_at']


class ProfileSummarySerializer(serializers.ModelSerializer):
    """Lightweight serializer for Header, Navbar and TopBar badges."""
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = [
            'full_name',
            'headline',
            'email',
            'phone',
            'location',
            'is_available',
            'avatar',
            'resume',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'instagram_url',
        ]