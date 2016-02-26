from django.shortcuts import render
from services import *
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
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