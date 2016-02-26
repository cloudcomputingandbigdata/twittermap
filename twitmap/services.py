from elastic.services import *

class SearchServices:

    def __init__(self):
        self.es = ElasticsearchServices()
        self.index = "tweetmap"
        self.doc_type = "tweets"

    def get_results_by_keyword(self, keyword, from_time=None, to_time=None):
        body = {
            "query": {
                "filtered": {
                    "query": {
                        "query_string": {
                            "query": "*" + keyword + "*",
                            "fields": ["contents"]
                        }
                    },
                    "filter": {
                        "range": {
                            "timestamp": {
                                "from": ("0" if from_time is None or from_time == '' else from_time),
                                "to": ("now" if to_time is None or to_time == '' else to_time)
                            }
                        }
                    }
                }
            }
        }
        res = self.es.search(self.index, self.doc_type, body)

        return res

    def search_scroll(self, keyword, from_time=None, to_time=None):
        body = {
            "query": {
                "filtered": {
                    "query": {
                        "query_string": {
                            "query": "*" + keyword + "*",
                            "fields": ["contents"]
                        }
                    },
                    "filter": {
                        "range": {
                            "timestamp": {
                                "from": ("0" if from_time is None or from_time == '' else from_time),
                                "to": ("now" if to_time is None or to_time == '' else to_time)
                            }
                        }
                    }
                }
            }
        }

        page = self.es.search_scroll(self.index, self.doc_type, body)
        # sid = page['_scroll_id']
        # scroll_size = page['hits']['total']
        # print scroll_size
        # print page

        return page

        # # Start scrolling
        # while (scroll_size > 0):
        #     print "Scrolling..."
        #     page = self.es.scroll(scroll_id = sid, scroll = '2m')
        #     # Update the scroll ID
        #     sid = page['_scroll_id']
        #     # Get the number of results that we returned in the last scroll
        #     scroll_size = len(page['hits']['hits'])
        #     print "scroll size: " + str(scroll_size)
        #     # Do something with the obtained page
        #     print page

    def scroll_results(self, scroll_id):
        print "Scrolling..."
        res = self.es.scroll(scroll_id = scroll_id)
        # Update the scroll ID
        #sid = page['_scroll_id']
        # Get the number of results that we returned in the last scroll
        #scroll_size = len(page['hits']['hits'])
        #print "scroll size: " + str(scroll_size)
        # Do something with the obtained page
        return res

    def insert_tweet(self, contents, author, timestamp, datetime, location_name, location_type, coordinates, country_code, country):
        location = {
            "type": location_type,
            "coordinates": coordinates
        }
        #print location
        body = {
            "contents": contents,
            "author": author,
            "timestamp": timestamp,
            "datetime": datetime,
            "location_name": location_name,
            "location": location,
            "country_code": country_code,
            "country": country
        }
        res = self.es.feed_data(self.index, self.doc_type, body)

        return res