from elasticsearch import Elasticsearch
from elasticsearch import NotFoundError
import sys

class ElasticsearchServices:

    def __init__(self):
        self.es = Elasticsearch([{'host': 'YOUR ELASTICSEARCH HOST', 'port': 9200}])
    
    # body should be in json format
    def feed_data(self, index, doc_type, body):
        res = None
        try:
            res = self.es.index(
                index = index,
                doc_type = doc_type,
                body = body
            )
        except:
            for e in sys.exc_info():
                print "Unexpected error:", e
            pass

        return res

    # body should be in json format
    def search(self, index, doc_type, body, size=20):
        res = self.es.search(
            index = index,
            doc_type = doc_type,
            body = body,
            size = size
        )

        return res

    def search_scroll(self, index, doc_type, body, scroll="2m", size=20):
        res = self.es.search(
            index = index,
            doc_type = doc_type,
            scroll = scroll,
            search_type = 'scan',
            size = size,
            body = body
        )

        return res

    def scroll(self, scroll_id, scroll="2m"):
        res = None
        try:
            res = self.es.scroll(scroll_id = scroll_id, scroll = scroll)
        except NotFoundError as e:
            print e
            res = {"hits": {"hits": []}}

        return res

    def get_total_hit(self, res):
        return res['hits']['total']
