(function() {
  $.ajax({
    type: "POST",
    url: "https://api.syncano.io/v1/instances/YOURINSTANCENAME/webhooks/p/abcd/findpullrequests/",
    data: {"username":"patcat", "repo":"GreatestRepoOfAllTime", "label":"invalid"}
  })
  .done(function(res) {
    var pulls = JSON.parse(res.result.stdout),
        pullsHTML = "";

    for (var i = 0; i < pulls.length; i++) {
      var stateHTML = "";
      for (var j = 0; j < pulls[i].labels.length; j++) {
          stateHTML += "<div class=\"label\">" + pulls[i].labels[j].name + "</div>";
      }
      pullsHTML += "<a class=\"pull pull-" + pulls[i].state + "\" href=\"" + pulls[i].url + "\" target=\"_blank\">" + pulls[i].title + stateHTML + "</a>"
    }

    document.getElementById('pull-requests').innerHTML = pullsHTML;
  });
}());