from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.shortcuts import redirect


# Serve Single Page Application
index = TemplateView.as_view(template_name='index.html')

# Redirect to login page if any non-existance page is attempted to be accessed
def view_404(request, exception=None):
    return redirect('/')