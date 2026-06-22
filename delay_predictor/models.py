from django.db import models

class Prediction(models.Model):

    WEATHER_CHOICES = [
        ('Clear', 'Clear'),
        ('Rainy', 'Rainy'),
        ('Foggy', 'Foggy')
    ]

    CONGESTION_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High')
    ]

    distance = models.IntegerField()

    weather = models.CharField(
        max_length=20,
        choices=WEATHER_CHOICES
    )

    day_of_week = models.CharField(max_length=20)

    time_of_day = models.CharField(max_length=20)

    train_type = models.CharField(max_length=20)

    historical_delay = models.IntegerField()

    route_congestion = models.CharField(
        max_length=20,
        choices=CONGESTION_CHOICES
    )

    predicted_delay = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction {self.id}"