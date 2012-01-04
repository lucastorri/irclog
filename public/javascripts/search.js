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
            console.log(msg.data);
			
            var result = JSON.parse(msg.data);
			
			result.files.forEach(function(file) {
                var fileUrl = document.URL + 'log/' + file + "?hl=" + result.query;
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
	}

	queryField.keyup(function() {
		clearTimeout(searchTimeout);
		lastSearch !== this.value && 
		        this.value.trim() &&
		        (searchTimeout = setTimeout(search, 500));
	});

});
