from django_celery_beat.models import PeriodicTask, IntervalSchedule

# Create a schedule: run every day
schedule, _ = IntervalSchedule.objects.get_or_create(
    every=1,
    period=IntervalSchedule.MINUTES
)

# Create the task
PeriodicTask.objects.create(
    interval=schedule,
    name='Delete old draws',
    task='app.tasks.delete_old_draws',
)
