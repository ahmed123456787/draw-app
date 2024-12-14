# Generated by Django 5.1.3 on 2024-11-30 21:14

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_child_image_user_image_alter_child_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='draw',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='draw',
            name='is_locked',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='child',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
