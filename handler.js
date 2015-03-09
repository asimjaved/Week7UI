var jade = require("jade");
var path = __dirname + "/UI/index.jade";
var fn = jade.compileFile(path);
var fs = require("fs");
var blogPosts = {
	jan: [
		{title: "Temp 1 Title",
		content: "Temp 1 Content",
		author: "Temp 1 Author",
		date: new Date(2015,0,1)},

		{title: "Temp 2 Title",
		content: "Temp 2 Content",
		author: "Temp 2 Author",
		date: new Date(2015,0,2)},

		{title: "Temp 3 Title",
		content: "Temp 3 Content",
		author: "Temp 3 Author",
		date: new Date(2015,0,3)}		
	],

	feb: [
		{title: "Temp 1 Title",
		content: "Temp 1 Content",
		author: "Temp 1 Author",
		date: new Date(2015,1,1)},

		{title: "Temp 2 Title",
		content: "Temp 2 Content",
		author: "Temp 2 Author",
		date: new Date(2015,1,2)},

		{title: "Temp 3 Title",
		content: "Temp 3 Content",
		author: "Temp 3 Author",
		date: new Date(2015,1,3)}		
	]
}
module.exports = function handler(req, res) {

	if (req.url === "/main.css") {
		fs.readFile(__dirname + "/UI/main.css", function(err, contents) {
			res.writeHead(200, {"Content-Type": "text/css"});
			res.write(contents);
			res.end();
		})
	} else {
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end(fn(blogPosts));
	}
};
