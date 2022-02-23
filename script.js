/* 
CORS workaround Modified from a code snippet by Paul van den Dool
https://stackoverflow.com/questions/42518419/html-text-scraping#answer-42528035
*/

// url to scrape
const urlToScrape = "https://github.com/";

// workaround for cross origin requests
$.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    const http = window.location.protocol === "http:" ? "http:" : "https:";
    options.url = http + "//cors-anywhere.herokuapp.com/" + options.url;
  }
});

// get request
$.ajax({
  url: urlToScrape,
  method: "GET"
}).done(function(data) {
  const html = $(data);
  const images = html.find("img");
  let output = "";

  $.each(images, function(index, value) {
    // image
    const imageSrc = $(value).attr("src");
    const imageHtml = '<img src="' + imageSrc + '"/>';
    // link
    const linkSrc = value.closest("a");
    const linkHtml = '<a href="' + linkSrc + '">' + imageHtml + "</a>";
    output += linkHtml;
  });
  $("#content").append(output);
});
