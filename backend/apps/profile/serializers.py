from django.apps import apps
from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Full Profile Serializer for public frontend rendering and admin updates."""
    full_name = serializers.ReadOnlyField()
    total_projects = serializers.SerializerMethodField()
    total_skills = serializers.SerializerMethodField()
    total_certificates = serializers.SerializerMethodField()
    projects_count = serializers.SerializerMethodField()
    skills_count = serializers.SerializerMethodField()
    certificates_count = serializers.SerializerMethodField()
    degree_info = serializers.SerializerMethodField()
    courses_completed = serializers.CharField(source='courses_completed_count', required=False)
    role = serializers.CharField(source='headline', read_only=True)
    bio = serializers.CharField(source='hero_description', read_only=True)

    def get_projects_count(self, obj):
        Project = apps.get_model('projects', 'Project')
        return Project.objects.count() if Project else 0

    def get_skills_count(self, obj):
        Skill = apps.get_model('skills', 'Skill')
        return Skill.objects.count() if Skill else 0

    def get_certificates_count(self, obj):
        Certificate = apps.get_model('certificates', 'Certificate')
        return Certificate.objects.count() if Certificate else 0

    def get_total_projects(self, obj):
        if obj and obj.total_projects_count:
            val = str(obj.total_projects_count).strip()
            return val if '+' in val else f"{val}+"
        return "4+"

    def get_total_skills(self, obj):
        if obj and hasattr(obj, 'total_skills_count') and obj.total_skills_count:
            val = str(obj.total_skills_count).strip()
            return val if '+' in val else f"{val}+"
        return "8+"

    def get_total_certificates(self, obj):
        if obj and obj.total_certificates_count:
            val = str(obj.total_certificates_count).strip()
            return val if '+' in val else f"{val}+"
        return "5+"

    def get_degree_info(self, obj):
        Education = apps.get_model('education', 'Education')
        mca = Education.objects.filter(degree__icontains='MCA').first() if Education else None
        if mca:
            return {
                "degree": mca.degree,
                "level": "Post-Graduate",
                "period": f"({mca.start_year} – {mca.end_year})",
            }
        return {
            "degree": "MCA",
            "level": "Post-Graduate",
            "period": "(2024 – 2026)",
        }

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'data'):
            if 'total_projects' in request.data:
                instance.total_projects_count = request.data['total_projects']
            if 'total_certificates' in request.data:
                instance.total_certificates_count = request.data['total_certificates']
        return super().update(instance, validated_data)

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
            'role',
            'hero_description',
            'bio',
            'about_text',
            'about_detailed_text',
            'about_image',
            'email',
            'phone',
            'location',
            'is_available',
            'years_of_learning',
            'total_projects',
            'total_skills',
            'total_certificates',
            'projects_count',
            'skills_count',
            'certificates_count',
            'degree_info',
            'courses_completed',
            'hours_of_coding',
            'avatar',
            'resume',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'instagram_url',
            'whatsapp_url',
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
            'whatsapp_url',
        ]