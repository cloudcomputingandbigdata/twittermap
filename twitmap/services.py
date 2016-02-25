from elastic.services import *

class SearchServices:

    def __init__(self):
        self.es = ElasticsearchServices()
        self.index = "tweetmap"
        self.doc_type = "tweets"

    def get_results_by_keyword(self, keyword):
        body = {
            "query": {
                "query_string": {
                    "query": keyword
                }
            }
        }
        res = self.es.search(self.index, self.doc_type, body)

        return res
