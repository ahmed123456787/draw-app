from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from core.models import Draw

@shared_task
def delete_old_draws():
    """
    Deletes Draw objects older than 6 months.
    """
    six_months_ago = timezone.now() - timedelta(days=60*6)
    old_draws = Draw.objects.filter(created_at__lte=six_months_ago)
    count = old_draws.count() 
    old_draws.delete()
    print(f"{count} old draws deleted.") 
