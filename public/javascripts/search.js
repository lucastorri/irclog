$(function() {

	var wsUri = "ws://localhost:9000/search";
	var connectToServer = function () {
		ws = new WebSocket(wsUri);
		ws.onopen = function(evt) {};
		ws.onclose = function(evt) {};
		ws.onerror = function(evt) {};
		
		ws.onmessage = function(msg) {
			
//{"query": "remote", "previews": {"akka.txt": [["the remote server on the node that the actor is residing, automatically.", 3], ["The sender of a remote message will be reachable with a reply through", 2], ["Automatic remote ‘sender’ reference management", 0]]}}
			
			
			$(".result").remove();

			var result = JSON.parse(msg.data);
			
			for (var file in result.previews) {
                var fileUrl = document.URL + 'log/' + file;
                var fileElement = $('<li/>', {
                    'class': 'result'
                });
                $('<a/>', {
                    'text': file,
                    'href': fileUrl
                }).appendTo(fileElement);
                var previewElements = $('<ul/>',{});
				result.previews[file].reverse().forEach(function(p) {
                    var previewElement = $('<li/>', {
                        'class': 'result'
                    });
                    $('<a/>', {
                        'href': fileUrl + '#' + p[1],
                        'text': p[0]
                    }).appendTo(previewElement);
                    previewElement.appendTo(previewElements);
				});
                previewElements.appendTo(fileElement);
                fileElement.appendTo('#searchresults');
			}

			  /*result.files.forEach(function(f) {
			    $('<li/>', {
			        'class': 'prettyprint result',
			        href: f,
			        text: f
			    }).appendTo('#searchresults');
			  });
			*/
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
	}

	queryField.keyup(function() {
		clearTimeout(searchTimeout);
		lastSearch !== this.value && 
		        this.value.trim() &&
		        (searchTimeout = setTimeout(search, 500));
	});

});
