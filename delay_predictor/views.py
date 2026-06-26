from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prediction
from .serializers import PredictionSerializer


@api_view(["GET"])
def test_api(request):
    return Response({"message": "API Working"})


@api_view(["POST"])
def predict(request):
    serializer = PredictionSerializer(data=request.data)

    if serializer.is_valid():

        # Dummy prediction for now
        serializer.save(predicted_delay=True)

        return Response({
            "status": "success",
            "prediction": True,
            "data": serializer.data
        })

    return Response(serializer.errors)