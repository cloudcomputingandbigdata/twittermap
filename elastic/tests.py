from django.test import TestCase
from services import ElasticsearchServices

# Create your tests here.
es = ElasticsearchServices()
res = es.search("tweetmap", "tweets",
{
    "query": {
        "query_string": {
            "query": "tweet"
        }
    }
})

print res