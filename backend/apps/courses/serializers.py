from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    """Full Course Serializer for Admin CMS & Details View."""

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'platform',
            'instructor',
            'completion_date',
            'course_url',
            'certificate_url',
            'is_completed',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CourseSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page 'Courses Completed' card."""

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'platform',
            'completion_date',
            'certificate_url',
            'is_completed',
            'order',
        ]