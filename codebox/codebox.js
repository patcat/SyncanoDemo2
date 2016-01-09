var request = require("request"),
    _ = require("lodash"),
    username = ARGS.username,
    repo = ARGS.repo,
    pullLabel = ARGS.label;

var options = {
  url: "https://api.github.com/repos/" + username + "/" + repo + "/issues?state=all",
  headers: {
    "User-Agent": "syncano-sample-pull-app"
  }
};

if (!username || !repo) {
    console.log("Error: Need more info!"); return false;
}

request(options, function (error, response, body) {
  if (error) {
    console.log("Error: ", JSON.stringify(error));
  } else if (!error && response.statusCode == 200) {
    var pulls = JSON.parse(body),
        returnValue = "[";
    
    _(pulls).forEach(function(pull) {
      var display = false;
      
      if (pullLabel) {
          if (_.filter(pull.labels, _.matches({"name": pullLabel})).length > 0) {
            display = true;
          }
      } else {
        display = true;
      }
      if (display) {
        returnValue += "{\"title\":\"" + pull.title + "\", \"url\":\"" + pull.html_url + "\",  \"state\":\"" + pull.state + "\",  \"labels\":" + JSON.stringify(pull.labels) + "},";  
      }
    }).value();
    returnValue = returnValue.substring(0, returnValue.length - 1);
    returnValue += "]";
    console.log(returnValue);
  }
});