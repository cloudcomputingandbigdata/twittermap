from elasticsearch import Elasticsearch

class ElasticsearchServices:

    def __init__(self):
        self.es = Elasticsearch()

    # body should be in json format
    def feed_data(self, index, doc_type, body):
        res = self.es.index(
            index = index,
            doc_type = doc_type,
            body = body
        )

        return res

    # body should be in json format
    def search(self, index, doc_type, body):
        res = self.es.search(
            index = index,
            doc_type = doc_type,
            body = body
        )

        return res

    def get_total_hit(self, res):
        return res['hits']['total']