# Generated by Django 5.1.3 on 2024-12-03 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_draw_is_archived_alter_draw_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='child',
            name='name',
            field=models.CharField(max_length=20),
        ),
    ]