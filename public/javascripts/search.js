$(function() {

  var wsUri = "ws://"+location.host+"/search";
  var connectToServer = function () {
    ws = new WebSocket(wsUri);
    ws.onopen = function(evt) {};
    ws.onclose = function(evt) {};
    ws.onerror = function(evt) {};

    ws.onmessage = function(msg) {

      $(".result").remove();

      console.log(msg);
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
            'html': p
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
    search();
  }

  queryField.keyup(function() {
    clearTimeout(searchTimeout);
    lastSearch !== this.value &&
            this.value.trim() &&
            (searchTimeout = setTimeout(search, 500));
  });

});
