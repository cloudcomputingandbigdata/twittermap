var tweetLoader = {};
tweetLoader.loadByKeyword = function(keyword, data) {
  var dtd = $.Deferred();
  $.ajax({
    url: "/search/" + keyword,
    type: 'GET',
    data: data,
  }).done(function(data) {
    dtd.resolve(data);
  })
  return dtd.promise();
};

tweetLoader.loadAll = function() {
  return this.loadByKeyword('');
}

tweetLoader.scroll = function(scrollId) {
  var dtd = $.Deferred();
  $.ajax({
    url: '/scroll/' + scrollId,
    type: 'GET'
  }).done(function(data) {
    dtd.resolve(data);
  });
  return dtd.promise();
}


module.exports = tweetLoader;