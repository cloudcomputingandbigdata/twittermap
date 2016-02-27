"""
    This module is a customized django manage.py command to use twitter
    streaming API. The command open a connection to twitter and pull tweets
    with corresponding track keywords to database or file based on options.
"""
import sys
from django.core.management.base import BaseCommand, CommandError
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from twitmap.services import SearchServices
import json


class Command(BaseCommand):
    """docstring for Command"""
    def add_arguments(self, parser):
        #positional arguments

        #optional arguments
        parser.add_argument('--output', action='store_true', dest='output', help='output tweets to twitter.json')
        
    def handle(self, *arg, **options):
        access_token = "YOUR ACCESS TOKEN"
        access_token_secret = "YOUR ACCESS TOKEN SECRET"
        consumer_key = "YOUR CONSUMER KEY"
        consumer_secret = "YOUR CONSUMER SECRET"
        listener = TweetListener(**options)
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        stream = Stream(auth, listener)
        stream.filter(locations=[-180, -90, 180, 90])


class TweetListener(StreamListener):
    """docstring for TweetListener"""
    def __init__(self, *arg, **options):
        if 'output' in options and options['output']:
            self.orig_stdout = sys.stdout
            self.output = file('twitter.json', 'w')
            sys.stdout = self.output

    def on_data(self, data):
        try:
            self.process(data)
        except KeyError as e:
            print e

        return True

    def on_error(self, status):
        sys.stdout = self.orig_stdout
        self.output.close()
        print status

    def process(self, data):
        ss = SearchServices()
        keywords = ss.keywords
        data_json = json.loads(data)
        contents = data_json['text']

        # if the tweet contains one of the keywords, it will be stored in the index
        if any(x in contents.lower() for x in keywords):
            if data_json['place'] is not None:
                location_name = data_json['place']['full_name']
                location_type = 'Point'
                coordinates = data_json['place']['bounding_box']['coordinates']
                country_code = data_json['place']['country_code']
                country = data_json['place']['country']

                if coordinates[0] is not None and len(coordinates[0]) > 0:
                    avg_x = 0
                    avg_y = 0
                    for c in coordinates[0]:
                        avg_x = (avg_x + c[0])
                        avg_y = (avg_y + c[1])
                    avg_x /= len(coordinates[0])
                    avg_y /= len(coordinates[0])
                    coordinates = [avg_x, avg_y]

                print coordinates

                timestamp = data_json['timestamp_ms']
                datetime = data_json['created_at']
                author = data_json['user']['name']
                #print(coordinates)
                #print("timestamp=%s, contents=%s, author=%s, location=%s" % (timestamp, contents, author, location))
                ss.insert_tweet(contents, author, timestamp, datetime, location_name, location_type, coordinates, country_code, country)

                print(data)


