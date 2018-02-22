
//On Document Load Jquery
$( document ).ready(function() {

//Ajax Get Request
$.ajax
({
  type: "GET",
  url: "https://shrinknation.com/summary/",
  data: "website="+location.href+"",
  success: function(html)
  {

    //Parse JSON resopnse if the content length exists
     if(JSON.parse(html).summary[0].length > 0) {

      //Create overlay Javascript Element
      var overlay = document.createElement("div");


      //Create variable for Article Summary Content
      var str = "";

      for (var i = 0; i < JSON.parse(html).summary.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
          str += JSON.parse(html).summary[i] + " ";
      }

      var divs = document.getElementsByTagName("div");
        for(var i = 0; i < divs.length; i++){
           //do something to each div like
           divs[i].style.cssText = "z-index: 9";
        }
      //Create variable for Article title
      var title = JSON.parse(html).title;

      //Take out backslashes in title
      title = title.replace(/\\/, "");

      //Variable for content reduction percentage
      var conPer = JSON.parse(html).reduce;

      conPer = Math.round(100 - (parseFloat(conPer) * 100));



      //Variable for fact percentage
      // var fact = JSON.parse(html).value;
      //
      // //Round fact percentage to a percentage instead of decimal
      // fact = Math.round(parseFloat(fact) * 100);

      //Divide content into paragraphs if possible
      const result = str.replace(/(.+?)(\n|$)+/gm
       , "<p>$1</p>\n\n");

      //Create title to html
      overlay.innerHTML += "<h1 style=\"color: white !important; font-size: 36px !important;  line-height: 1.3em !important\">"+ title+"</h1><br />";

      //Create cred and reduction html
      // overlay.innerHTML += "<h7>Perspective Credibility: <span style=\"font-style: italic\">"+ fact +"%</span></h7><br />";

      overlay.innerHTML += "<h7>Reduction: <span style=\"font-style: italic\">"+ conPer +"%</span></h7><br /><br />";

      //Render overlay
      overlay.innerHTML += result;

      //Style overlay
      overlay.style.cssText = "position: fixed; color: white !important; background: rgba(194,83,83,.93); z-index:9999 !important; width: 100vw; height: 100vh; padding: 24vh 20% 13%; top: 0; left: 0; box-sizing: border-box; font-size: 18px !important; overflow: scroll; display: block; text-align: left;";

      //Render overlay
      document.body.appendChild(overlay);

      //Display and place logo
      var img = document.createElement("img");
      img.src = "https://firebasestorage.googleapis.com/v0/b/sow-app.appspot.com/o/shrink.svg?alt=media&token=f2c3bd9f-f278-43ae-82eb-033a9b0a31c8";
      img.style.cssText = "position: absolute; top: 11%; left: 20%; z-index:9999; width: 70px; ";
      overlay.appendChild(img);

      //Display and place X on screen
      var ximg = document.createElement("img");
      ximg.src = "https://firebasestorage.googleapis.com/v0/b/sow-app.appspot.com/o/x.svg?alt=media&token=cd13f549-eb5c-49e8-87cb-075131e993aa";
      ximg.style.cssText = "position: absolute; top: 5%; right: 5%; z-index:9999; width: 20px; cursor: pointer";
      overlay.appendChild(ximg);

      //Make overlay dissapear if click on x or anywhere else
      ximg.addEventListener("click", function(){ overlay.style.display = 'none' });
      overlay.addEventListener("click", function(){ overlay.style.display = 'none' });

     }


  },
    complete: function(xhr, textStatus) {
        console.log(xhr);
        console.log(textStatus);

    }
});





});
