
$("#searchButton").on("click",function(){
	var searchTerm = $("#searchTerm").val().trim();
	console.log($("#searchTerm").val().trim())
	var numRecords = $("#numRecords").val().trim();
	// @TODO determine if blank or not
	if ($("#startYear").val().trim().length===0){
		startYear = "00000000";
		console.log(startYear)
	}
	if ($("#endYear").val().trim().length===0){
		endYear = "20170228";
		console.log(endYear)
	}

	testfunction(searchTerm, numRecords, startYear, endYear);

});


function testfunction(searchTerm, numRecords, startYear, endYear){
	queryObject ={
		q:searchTerm,
		begin_date:startYear,
		end_year:endYear,
	}
	queryObject = $.param(queryObject);
	queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + "b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q="+queryObject; 
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		var data = response.response.docs;
		console.log(data);

		for(var i = 0;i<numRecords;i++){
			var articleDiv = $("<div>");
			var titleH2 = $("<h2>");
			var author = $("<p>");
			var section = $("<p>");
			var date = $("<p>");
			var url = $("<a>");

			titleH2.text(data[i].headline.main);
			author.text(author.text(data[i].byline.original));
			date.text(data[i].pub_date);
			section.text(data[i].section_name);
			url.html("<a>" + data[i].web_url + "</a>");

			articleDiv.append(titleH2);
			articleDiv.append(author);
			articleDiv.append(section);
			articleDiv.append(date);
			articleDiv.append(url);

			$("#topArticles").append(articleDiv);
		}
	})
}
