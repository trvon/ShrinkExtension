//Whitelisting Popup Logic. Uncommented for right now.
$( document ).ready(function() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      console.log("current url: " + url)

  chrome.storage.sync.get("whitelist", function (obj) {

    if($.inArray(url, obj.whitelist) > -1) {

      document.getElementById("white").textContent="Remove from Whitelist";

    }

  document.getElementById("white").addEventListener("click", function(){
    
    if(obj.whitelist == null || obj.whitelist == undefined) {
            chrome.storage.sync.set({"whitelist": [url]})
          } else {

          if(obj.whitelist.length < 1) {
            chrome.storage.sync.set({"whitelist": [url]})
          } else if($.inArray(url, obj.whitelist) <= -1) {
            var arr = obj.whitelist;

            arr.push(url)

            console.log(arr)

            console.log($.inArray(url, arr) > -1)

            chrome.storage.sync.set({"whitelist": arr})
            document.getElementById("white").textContent="Remove from Whitelist";
          } else {
            
            var arr = obj.whitelist;
            var index = arr.indexOf(url);    // <-- Not supported in <IE9

            if (index !== -1) {
                arr.splice(index, 1);
            }

            chrome.storage.sync.set({"whitelist": arr})

            document.getElementById("white").textContent="Add to Whitelist";
            
          }
            
          }



    });

    });

  });


});
