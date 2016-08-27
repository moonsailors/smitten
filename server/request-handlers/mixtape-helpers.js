function processSearchResults(results) {
  return results.map(function(result) {
    var song = {
      title: result.title,
      artist: result.user.username,
      image: result.artwork_url,
      stream: result.stream_url,
      permalink: result.permalink_url
    };

    return song;
  });
}

module.exports = {
  processSearchResults: processSearchResults
};