# TwitterMap

![shot](shot.png)

### AWS Demo
View the [twitter map](http://twittmap.q3f5vtg5g3.us-west-2.elasticbeanstalk.com/) on beanstalk.

### Twitter Map

- Get tweets from twitter Streaming API using pre-defined track words and store them to ElasticSearch engine.
- Use MapBox API to render these tweets on the map based on your configuration on control panel.
- You should choose a keyword from the dropdown list to display only those tweets which contain the keyword.
- You could filter the new tweets within last X minutes where X is your input.
- You could drop a pin and drag it on the map and configure the distance so that the app would shows tweets that are within this distance from this pin.
- You could choose to update tweets automatically.

### Stack
- Elastic Search (tweet storage and search)
- Django (backend)
- React (frontend)

### Usage

##### Stream
```
// boot elasticsearch
$ ./elasticsearch

//cd to twittermap app root folder
$ python manage.py stream
```

##### Build JS
```
$ npm install
$ npm run build
```

##### Start server
```
$ python manage.py runserver
```
