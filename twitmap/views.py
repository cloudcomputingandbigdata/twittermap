from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from services import SearchServices

# Create your views here.
def index(request):
    return render(request, 'twittermap/index.html')

def getkeywords(request):
    ss = SearchServices()
    keywords = ss.keywords
    list = []
    for k in keywords:
        pair = {
            "name": k,
            "value": k
        }
        list.append(pair)

    output = {
        "success": True,
        "results": list
    }
    return JsonResponse(output)
    
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

def test_search(request, keyword = ''):
    if keyword == '':
        return HttpResponse("Please specify the keyword!")
    services = SearchServices()
    from_time = request.GET.get("from")
    to_time = request.GET.get("to")
    output = services.get_results_by_keyword(keyword, from_time, to_time)
    return JsonResponse(output)