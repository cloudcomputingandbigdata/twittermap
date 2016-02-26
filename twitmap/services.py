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

    def insert_tweet(self, contents, author, timestamp, location):
        body = {
            "contents": contents,
            "author": author,
            "timestamp": timestamp,
            "location": location
        }
        res = self.es.feed_data(self.index, self.doc_type, body)

        return res