var debug = false;

$(function() {

  var wsUri = "ws://"+location.host+"/search";
  var connectToServer = function () {
    ws = new WebSocket(wsUri);
    ws.onopen = function(evt) {};
    ws.onclose = function(evt) {};
    ws.onerror = function(evt) {};

    ws.onmessage = function(msg) {
      debug && console.log(msg);

      $(".result").remove();
      var result = JSON.parse(msg.data);

      result.files.forEach(function(file) {
        var fileUrl = "http://" + location.host + '/log/' + file + "?hl=" + result.query;
        var fileElement = $('<li/>', {
          'class': 'result'
        });
        $('<a/>', {
          'text': file,
          'href': fileUrl
        }).appendTo(fileElement);
        var previewElements = $('<ul/>',{});
        result.previews[file].forEach(function(p) {
          var previewElement = $('<li/>', {
            'html': p,
            'class': 'snippet'
          });
          previewElement.appendTo(previewElements);
        });
        previewElements.appendTo(fileElement);
        fileElement.appendTo('#searchresults');
      });
    };

    return ws;
  }

  var queryField = $("#q");
  var searchTimeout = 0;
  var ws = connectToServer();
  var lastSearch;

  var search = function() {
    lastSearch = queryField[0].value.trim();
    ws.send(lastSearch);
    location.hash = lastSearch;
  }

  if (location.hash) {
    queryField[0].value = location.hash.substring(1);
    setTimeout(search, 500);
  }

  queryField.keyup(function() {
    clearTimeout(searchTimeout);
    lastSearch !== this.value &&
            this.value.trim() &&
            (searchTimeout = setTimeout(search, 500));
  });

});
