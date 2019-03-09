from django.shortcuts import render

# Create your views here.
from django.views import View


class Home(View):
    template_name = 'home/index.html'

    def get(self, request):
        return render(request, self.template_name)
