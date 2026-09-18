from django.urls import path
from .views import SiteSettingDetailView, PublicSiteSettingView, LegalDocumentView

urlpatterns = [
    path('', SiteSettingDetailView.as_view(), name='site_settings_detail'),
    path('public/', PublicSiteSettingView.as_view(), name='public_site_settings'),
    path('legal/', LegalDocumentView.as_view(), name='legal_documents'),
]