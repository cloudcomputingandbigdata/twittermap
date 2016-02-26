from django.shortcuts import render
from .services import *
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, 'twittermap/index.html')

def getkeywords(request):
    return JsonResponse({
        "success": True,
        "results": [
            {
                "name"  : "Choice 1",
                "value" : "value1"
            },
            {
                "name"  : "Choice 2",
                "value" : "value2"
            },
            {
                "name"  : "Choice 3",
                "value" : "value3"
            },
            {
                "name"  : "Choice 4",
                "value" : "value4"
            },
            {
                "name"  : "Choice 5",
                "value" : "value5"
            }
        ]
    })
    
def search_by_keyword(request, keyword = ''):
    if keyword == '':
        return HttpResponse("Please specify the keyword!")
    services = SearchServices()
    from_time = request.GET.get("from")
    to_time = request.GET.get("to")
    output = services.search_scroll(keyword, from_time, to_time)
    return JsonResponse(output)

def scroll_results(request, sid):
    #scroll_id = request.GET.get('scroll_id', '')
    if sid == '':
        return HttpResponse("Please specify the scroll_id!")
    services = SearchServices()
    output = services.scroll_results(sid)
    return JsonResponse(output)