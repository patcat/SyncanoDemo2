var account = new Syncano({accountKey: "YOURACCOUNTKEY"}),
    instanceName = "YOURINSTANCENAME";

(function() {
    account.instance(instanceName).codebox(1).run({"payload":{"username":"patcat", "repo":"GreatestRepoOfAllTime", "label":"invalid"}}, function(err, res) {
        var requestInterval = setInterval(function() {
            account.instance(instanceName).codebox(1).trace(res.id, function(err, res) {
                if (res.status !== "pending") {
                    var pulls = JSON.parse(res.result.stdout),
                        pullsHTML = "";
                    
                    clearInterval(requestInterval);

                    for (var i = 0; i < pulls.length; i++) {
                        var stateHTML = "";
                        for (var j = 0; j < pulls[i].labels.length; j++) {
                            stateHTML += "<div class=\"label\">" + pulls[i].labels[j].name + "</div>";
                        }
                        pullsHTML += "<a class=\"pull pull-" + pulls[i].state + "\" href=\"" + pulls[i].url + "\" target=\"_blank\">" + pulls[i].title + stateHTML + "</a>"
                    }

                    document.getElementById('pull-requests').innerHTML = pullsHTML;
                }
            });
        }, 500);
    });
}());