var express = require("express"), http = require("http");
app = express();

var AWS = require('aws-sdk');

AWS.config.update({
	region : "us-west-2"
});

app.get('/', function(req,res){
	res.send("wow");
});

app.get('/users', function(req,res){

});

app.get('/user/:userid', function(req,res){
	var docClient = new AWS.DynamoDB.DocumentClient();
	var params = {
		TableName:"users",
		Key:{
			"userid":"",
			"promo":""
		}
	};

	docClient.get(params,function(err,data){
		if(err){
			res.send("Unable to read item. Error JSON :"+JSON.stringify(err,null,2));
		}else{
			res.send("Get Item succeeded : "+ JSON.stringify(data, null,2));
		}
	});

});

app.listen(process.env.PORT, function(){
	console.log("OK");
});

