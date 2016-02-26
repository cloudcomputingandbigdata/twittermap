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
        stream.filter(track=['Ruby', 'JavaScript', 'Python'], locations=[-180, -90, 180, 90])


class TweetListener(StreamListener):
    """docstring for TweetListener"""
    def __init__(self, *arg, **options):
        if 'output' in options and options['output']:
            self.orig_stdout = sys.stdout
            self.output = file('twitter.json', 'w')
            sys.stdout = self.output

    def on_data(self, data):
        print(data)
        ss = SearchServices()
        data_json = json.loads(data)
        timestamp = str(data_json['timestamp_ms'])
        datetime = data_json['created_at']
        contents = data_json['text']
        author = data_json['user']['name']
        location = data_json['user']['location'] #TODO
        #print(timestamp)
        #print("timestamp=%s, contents=%s, author=%s, location=%s" % (timestamp, contents, author, location))
        ss.insert_tweet(contents, author, timestamp, datetime, location)

        return True

    def on_error(self, status):
        sys.stdout = self.orig_stdout
        self.output.close()
        print status



