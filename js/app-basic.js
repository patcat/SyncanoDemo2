var account = new Syncano({accountKey: "YOURACCOUNTKEY"}),
    instanceName = "YOURINTERFACENAME";

(function() {
    account.instance(instanceName).codebox(1).run({}, function(err, res) {
        console.log("CodeBox successfully run");
        console.log(err, res);

        setTimeout(function() {
            account.instance(instanceName).codebox(1).trace(res.id, function(err, res) {
                console.log("Response:");
                console.log(err, res);
            })
        }, 500);
    });
}());