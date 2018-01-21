var slidervalue0;
var string3;
var body = document.getElementsByTagName("BODY")[0];
var divs = document.getElementsByTagName("div");
var blocked;
var trending_switch;
var friends_switch;
var ui_switch;
var bubble_switch;
var politic_slider;
var blocked_div = document.createElement('div');
var readjust = false;
var prefix_dir= chrome.extension.getURL("");
console.log(prefix_dir);
var img_add = "<img src=\""+prefix_dir+"disclaimer.png\" style=\"position:absolute;z-index:2001;top:40%;left:30%;width:40%;\" >";
var div_add = "<div style=\"width:100%; height:100%; background-color:#000; opacity:0.8; position:absolute;top:0px;bottom:0px; z-index:2000;\"></div>";
var html_add = div_add.concat(img_add);
blocked_div.innerHTML = html_add;



chrome.storage.sync.get('value_politic_slider', function(data) {
    politic_slider = data.value_politic_slider;
});
chrome.storage.sync.get('value_trending_switch', function(data) {
    trending_switch = data.value_trending_switch;
});
chrome.storage.sync.get('value_friends_switch', function(data) {
    friends_switch = data.value_friends_switch;
});
chrome.storage.sync.get('value_ui_switch', function(data) {
    ui_switch = data.value_ui_switch;
});
chrome.storage.sync.get('value_bubble_switch', function(data) {
    bubble_switch = data.value_bubble_switch;
});


///////////////// WEB PAGE BLOCK /////////////////

var _currenturl = window.location.href;
console.log(_currenturl);
var port = chrome.runtime.connect({
    name: "blockurls"
});
port.postMessage({
    url: _currenturl
});
port.onMessage.addListener(function(msg) {
    if (msg.isblocked == true && bubble_switch == "Outside" && _currenturl.indexOf("google") == -1) {
        console.log("blocked");
        blocked = true;
        if (document.body != null) {
            document.body.appendChild(blocked_div);
            body.style = "height:100%";
            body.style = "overflow:hidden";
        }
    } else {
        console.log("not blocked");
        blocked = false;
        if (ui_switch == "On" && _currenturl.indexOf("google") == -1) startit();
    }
});

/////////////////   /////////////////   /////////////////

/* MutationObserver configuration data: Listen for "childList"
 * mutations in the specified element and its descendants */
var config = {
    childList: true,
    subtree: true
};
var regex = /<a.*?>[^<]*<\/a>/;
var nmbr;

/* Traverse 'rootNode' and its descendants and modify '<a>' tags */
function modifyLinks(rootNode) {
    var nodes = [rootNode];

    while (nodes.length > 0) {
        var node = nodes.shift();
        var errorNode;

        if (node.id == "search") {

            var content = node.getElementsByClassName("g");
            var tempArray = [];
            var leftArray = [];
            var centerArray = [];
            var rightArray = [];
            var x = 0;
            var y = 0;
            var z = 0;
            var main_title = node.getElementsByClassName("r");
            console.log(content);

            if(friends_switch=="On"){

            for (var b = 0; b < 5; b++) {
                var random_number = Math.floor((Math.random() * 15) + 1);
                var trending_div = document.createElement('span');
                trending_div.innerHTML = "<img src=\""+prefix_dir+"icons/trending_icon.svg\" style=\"max-width:20px;\"> ";
                var tit = main_title[random_number].getElementsByTagName("a")
                tit[0].parentNode.insertBefore(trending_div, tit[0]);
            }

            for (var b = 0; b < 10; b++) {
                var random_number = Math.floor((Math.random() * 20) + 1);
                if (random_number % 2 ==0){
                  var social_div = document.createElement('div');
                  social_div.style="display:inline;"
                  social_div.innerHTML = "<img src=\""+prefix_dir+"icons/iconsocial1.png\" style=\"max-width:20px;\"> <img src=\""+prefix_dir+"icons/iconsocial2.png\" style=\"max-width:20px;\"> ";
                  var bot = content[random_number].getElementsByClassName("s")
                  bot[0].parentNode.appendChild(social_div);
                }
                else{
                  var social_div = document.createElement('div');
                  social_div.style="display:inline;"
                  social_div.innerHTML = "<img src=\""+prefix_dir+"icons/iconsocial3.png\" style=\"max-width:20px;\"> <img src=\""+prefix_dir+"icons/iconsocial1.png\" style=\"max-width:20px;\"> <img src=\""+prefix_dir+"icons/iconsocial4.png\" style=\"max-width:20px;\"> <img src=\""+prefix_dir+"icons/iconsocial2.png\" style=\"max-width:20px;\">";
                  var bot = content[random_number].getElementsByClassName("s")
                  bot[0].parentNode.appendChild(social_div);
                }
            }
          }




            for (var a = 0; a < content.length; a++) {
                nmbr = a;
                tempArray[a] = content[a];

                var source = content[a].getElementsByTagName("cite");

                // console.log("Source:");
                // console.log(source[0].innerText);
                for (var b = 0; b < left.length; b++) {
                    try {
                        if (source[0].innerText.indexOf(left[b]) !== -1) {
                            source[0].style = "background-color:#FF5A5F !important";
                            leftArray[x] = a;
                            x++;
                        }
                    } catch (err) {
                        console.log("error reading innerText");
                    }

                }
                for (var b = 0; b < center.length; b++) {
                    try {
                        if (source[0].innerText.indexOf(center[b]) !== -1) {
                            source[0].style = "background-color:#95A5A6 !important";
                            centerArray[y] = a;
                            y++;
                        }
                    } catch (err) {
                        console.log("error reading innerText");
                    }

                }
                for (var b = 0; b < right.length; b++) {
                    try {
                        if (source[0].innerText.indexOf(right[b]) !== -1) {
                            source[0].style = "background-color:#55DDE0 !important";
                            rightArray[z] = a;
                            z++;
                        }
                    } catch (err) {
                        console.log("error reading innerText");
                    }

                }

                // console.log("content");
                // console.log(content[a].innerText);
                // console.log("\n");
            }



            if (politic_slider == 1 || politic_slider == 2) {
                var x = 0;
                for (var a = 0; a < leftArray.length; a++) {
                    try {
                        content[0].parentNode.removeChild(content[leftArray[a] - x]);
                        x++;
                    } catch (err) {
                        console.log("error reading innerText");
                    }
                }
                for (var a = 0; a < leftArray.length; a++) {
                    content[0].parentNode.insertBefore(tempArray[leftArray[a]], content[0]);
                }
            }
            if (politic_slider == 5 || politic_slider == 4) {
                var x = 0;
                for (var a = 0; a < rightArray.length; a++) {
                    try {
                        content[0].parentNode.removeChild(content[rightArray[a] - x]);
                        x++;
                    } catch (err) {
                        console.log("error reading innerText");
                    }
                }
                for (var a = 0; a < rightArray.length; a++) {
                    content[0].parentNode.insertBefore(tempArray[rightArray[a]], content[0]);
                }
            }
            if (politic_slider == 2 || politic_slider == 4) {
                var x = 0;
                for (var a = 0; a < centerArray.length; a++) {
                    try {
                        content[0].parentNode.removeChild(content[centerArray[a] - x]);
                        x++;
                    } catch (err) {
                        console.log("error reading innerText");
                    }
                }
                for (var a = 0; a < centerArray.length; a++) {
                    content[0].parentNode.insertBefore(tempArray[centerArray[a]], content[0]);
                }
            }

            // for (var a = 0; a < tempArray.length - 1; a++) {
            //     content[0].parentNode.removeChild(content[0]);
            // }
            // console.log(content[0]);
            // for (var a = tempArray.length - 1; a >= 0; a--) {
            //     content[0].parentNode.appendChild(tempArray[a]);
            // }
        }
    }
}

/* Observer1: Looks for 'div.search' */
var observer1 = new MutationObserver(function(mutations) {
    /* For each MutationRecord in 'mutations'... */
    mutations.some(function(mutation) {
        /* ...if nodes have beed added... */
        if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
            /* ...look for 'div#search' */
            var node = mutation.target.querySelector("div#search");
            if (node) {
                /* 'div#search' found; stop observer 1 and start observer 2 */
                observer1.disconnect();
                observer2.observe(node, config);

                if (regex.test(node.innerHTML)) {
                    /* Modify any '<a>' elements already in the current node */
                    modifyLinks(node);
                }
                return true;
            }
        }
    });
});

/* Observer2: Listens for '<a>' elements insertion */
var observer2 = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function(node) {
                /* If 'node' or any of its desctants are '<a>'... */
                if (regex.test(node.outerHTML)) {
                    /* ...do something with them */
                    modifyLinks(node);
                }
            });
        }
    });
});

/* Start observing 'body' for 'div#search' */
observer1.observe(document.body, config);

///////////////// ///////////////// /////////////////

///////////////// DATABASE /////////////////

var left = [
    "theguardian.com",
    "slate.com",
    "aljazeera.com",
    "nytimes.com",
    "buzzfeed.com",
    "bbc.com",
    "huffingtonpost.co.uk",
    "washingtonpost.com",
    "economist.com",
    "www.politico.com",
    "mirror.co.uk",
    "independent.co.uk",
    "dailyrecord.co.uk",
    "theestablishment.co",
    "vice.com",
    "npr.org",
    "democracynow.org",
    "wired.com",
    "salon.com",
    "pri.org"
];

var center = [
    "al-monitor.com",
    "environmentalleader.com",
    "dailystar.co.uk",
    "inews.co.uk",
    "thetimes.co.uk",
    "edition.cnn.com",
    "express.co.uk",
    "ft.com",
    "nbcnews.com",
    "wsj.com",
    "cbsnews.com",
    "bloomberg.com",
    "abcnews.go.com"
];

var right = [
    "zerohedge.com",
    "foxnews.com",
    "breitbart.com",
    "theblaze.com",
    "dailymail.co.uk",
    "telegraph.co.uk",
    "thesun.co.uk",
    "theamericanconservative.com",
    "cnsnews.com",
    "redstate.com",
    "rushlimbaugh.com",
    "pravdareport.com",
    "migrationwatchuk.org"
];


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.readjust == true && _currenturl.indexOf("google") == -1) {
            startit();
        }
        sendResponse({
            farewell: "ok"
        });
    });


var startit = function() {

    /////////////////////////////////////
    // Generic helper functions
    /////////////////////////////////////


    // Add :scope functionality to QS & QSA
    (function(doc, proto) {
        try { // Check if browser supports :scope natively
            doc.querySelector(':scope body');
        } catch (err) { // Polyfill native methods if it doesn't
            ['querySelector', 'querySelectorAll'].forEach(function(method) {
                var nativ = proto[method];
                proto[method] = function(selectors) {
                    if (/(^|,)\s*:scope/.test(selectors)) { // Only if selectors contains :scope
                        var id = this.id; // Remember current element id
                        this.id = 'ID_' + Date.now(); // Assign new unique id
                        selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id); // Replace :scope with #ID
                        var result = doc[method](selectors);
                        this.id = id; // Restore previous id
                        return result;
                    } else {
                        return nativ.call(this, selectors); // Use native code for other selectors
                    }
                }
            });
        }
    })(window.document, Element.prototype);


    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // Mute a singular HTML5 element
    function muteMe(elem) {
        elem.muted = true;
        elem.pause();
    }

    // Try to mute all video and audio elements on the page
    function mutePage() {
        var videos = document.querySelectorAll("video"),
            audios = document.querySelectorAll("audio");

        [].forEach.call(videos, function(video) {
            muteMe(video);
        });
        [].forEach.call(audios, function(audio) {
            muteMe(audio);
        });
    }

    /////////////////////////////////////
    // State functions
    /////////////////////////////////////

    // Run on load functionality
    function runOnLoad() {
        // When the content has finished loading, enable Just Read to run
        window.onload = function(event) {
            isPaused = false;
        }

        // Make the next part wait until the content is loaded
        hideLoad = false;
        isPaused = true;
    }

    // User-selected text functionality
    var last,
        bgc,
        selected;

    function startSelectElement(doc) {
        var mouseFunc = function(e) {
                var elem = e.target;

                if (last != elem) {
                    if (last != null) {
                        last.classList.remove("hovered");
                    }

                    last = elem;
                    elem.classList.add("hovered");
                }
            },
            clickFunc = function(e) {
                selected = e.target;

                isPaused = false; // Enable the extension to run

                exitFunc();
            },
            escFunc = function(e) {
                // Listen for the "Esc" key and exit if so
                if (e.keyCode === 27)
                    exitFunc();
            },
            exitFunc = function() {
                doc.removeEventListener('mouseover', mouseFunc);
                doc.removeEventListener('click', clickFunc);
                doc.removeEventListener('keyup', escFunc);

                if (doc.querySelector(".hovered") != null)
                    doc.querySelector(".hovered").classList.remove("hovered");

                if (doc.getElementById("tempStyle") != null)
                    doc.getElementById("tempStyle").parentNode.removeChild(doc.getElementById("tempStyle"));
            }

        doc.addEventListener('mouseover', mouseFunc);
        doc.addEventListener('click', clickFunc);
        doc.addEventListener('keyup', escFunc);

        doc.documentElement.focus();

        // Add our styles temporarily
        var tempStyle = doc.createElement("style");
        tempStyle.id = "temp-style";
        tempStyle.innerText = ".hovered, .hovered * { cursor: pointer !important; color: black !important; background-color: #2095f2 !important; }";

        doc.head.appendChild(tempStyle);

        // Make the next part wait until a user has selected an element to use
        useText = false;
        isPaused = true;
    }

    // Similar to ^^ but for deletion once the article is open
    function startDeleteElement(doc) {
        var mouseFunc = function(e) {
                var elem = e.target;

                if (!elem.classList.contains("simple-container") &&
                    !elem.classList.contains("simple-close") &&
                    !elem.classList.contains("simple-edit") &&
                    !elem.classList.contains("simple-edit-theme") &&
                    !elem.parentNode.classList.contains("simple-edit-theme") &&
                    !elem.classList.contains("simple-delete") &&
                    !elem.parentNode.classList.contains("simple-delete") &&
                    doc.body != elem &&
                    doc.documentElement != elem &&
                    elem.tagName !== "path" &&
                    elem.tagName !== "rect" &&
                    elem.tagName !== "polygon") {
                    if (last != elem) {
                        if (last != null) {
                            last.classList.remove("hovered");
                        }

                        last = elem;
                        elem.classList.add("hovered");
                    }
                }
            },
            clickFunc = function(e) {
                selected = e.target;

                if (!selected.classList.contains("simple-container") &&
                    !selected.classList.contains("simple-close") &&
                    !selected.classList.contains("simple-edit") &&
                    !selected.classList.contains("simple-edit-theme") &&
                    !selected.parentNode.classList.contains("simple-edit-theme") &&
                    !selected.classList.contains("simple-delete") &&
                    !selected.parentNode.classList.contains("simple-delete") &&
                    doc.body != selected &&
                    doc.documentElement != selected &&
                    selected.tagName !== "path" &&
                    selected.tagName !== "rect" &&
                    selected.tagName !== "polygon")
                    selected.parentNode.removeChild(selected);

                e.preventDefault();
            },
            escFunc = function(e) {
                // Listen for the "Esc" key and exit if so
                if (e.keyCode === 27)
                    exitFunc();
            },
            exitFunc = function() {
                doc.removeEventListener('mouseover', mouseFunc);
                doc.removeEventListener('click', clickFunc);
                doc.removeEventListener('keyup', escFunc);

                if (doc.querySelector(".hovered") != null)
                    doc.querySelector(".hovered").classList.remove("hovered");

                doc.body.classList.remove("simple-deleting");

                selected = null;

                sd.classList.remove("active");
                sd.onclick = function() {
                    startDeleteElement(simpleArticleIframe);
                };
            }

        doc.body.classList.add("simple-deleting");

        doc.addEventListener('mouseover', mouseFunc);
        doc.addEventListener('click', clickFunc);
        doc.addEventListener('keyup', escFunc);

        var sd = simpleArticleIframe.querySelector(".simple-delete");

        sd.classList.add("active");
        sd.onclick = function() {
            exitFunc();
        };
    }







    /////////////////////////////////////
    // Chrome storage functions
    /////////////////////////////////////

    var leavePres = false,
        showDelModeBtn = false;

    // Given a chrome storage object add them to our local stylsheet obj
    function getStylesFromStorage(storage) {
        for (var key in storage) {
            // Convert the old format into the new format
            if (key === "just-read-stylesheets") {
                // Save each stylesheet in the new format
                for (var stylesheet in storage[key]) {
                    var obj = {};
                    obj['jr-' + stylesheet] = storage[key][stylesheet];
                    chrome.storage.sync.set(obj);
                    stylesheetObj[stylesheet] = storage[key][stylesheet];
                }

                // Remove the old format
                removeStyleFromStorage(key);

            } else if (key.substring(0, 3) === "jr-") { // Get stylesheets in the new format
                stylesheetObj[key.substring(3)] = storage[key];
            } else if (key === "show-del-btn") {
                showDelModeBtn = storage[key];
            } else if (key === "leave-pres") {
                leavePres = storage[key];
            }
        }
    }

    // Set the chrome storage based on our stylesheet object
    function setStylesOfStorage() {
        for (var stylesheet in stylesheetObj) {
            var obj = {};
            obj['jr-' + stylesheet] = stylesheetObj[stylesheet];
            chrome.storage.sync.set(obj);
        }
    }

    // Remove a given element from chrome storage
    function removeStyleFromStorage(stylesheet) {
        chrome.storage.sync.remove(stylesheet);
    }




    /////////////////////////////////////
    // Extension-related helper functions
    /////////////////////////////////////

    function checkElemForDate(elem, attrList, deleteMe) {
        var myDate = false;
        if (elem) {
            for (var i = 0; i < attrList.length; i++) {
                if (elem[attrList[i]] &&
                    elem[attrList[i]] != "" //  Make sure it's
                    &&
                    elem[attrList[i]].split(' ').length < 10) { // Make sure the date isn't absurdly long
                    myDate = elem[attrList[i]];

                    if (deleteMe) {
                        elem.dataset.simpleDelete = true; // Flag it for removal later
                    }
                }
            }
        }

        return myDate;
    }

    function getArticleDate() {
        // Make sure that the pageSelectedContainer isn't empty
        if (pageSelectedContainer == null)
            pageSelectedContainer = document.body;

        // Check to see if there's a date class
        var date = false,
            toCheck = [
                [pageSelectedContainer.querySelector('[class^="date"]'), ["innerText"], true],
                [pageSelectedContainer.querySelector('[class*="-date"]'), ["innerText"], true],
                [pageSelectedContainer.querySelector('[class*="_date"]'), ["innerText"], true],
                [document.body.querySelector('[class^="date"]'), ["innerText"], false],
                [document.body.querySelector('[class*="-date"]'), ["innerText"], false],
                [document.body.querySelector('[class*="_date"]'), ["innerText"], false],
                [document.head.querySelector('meta[name^="date"]'), ["content"], false],
                [document.head.querySelector('meta[name*="-date"]'), ["content"], false],
                [pageSelectedContainer.querySelector('time'), ["datetime", "innerText"], true],
                [document.body.querySelector('time'), ["datetime", "innerText"], false],
            ];


        for (var i = 0; i < toCheck.length; i++) {
            if (!date) {
                var checkObj = toCheck[i];
                date = checkElemForDate(checkObj[0], checkObj[1], checkObj[2])
            }
        }

        if (date)
            return date.replace(/on\s/gi, '').replace(/(?:\r\n|\r|\n)/gi, '&nbsp;').replace(/[<]br[^>]*[>]/gi, '&nbsp;'); // Replace <br>, \n, and "on"

        return "Unknown date";
    }

    function checkHeading(elem, heading, del) {
        if (elem && elem.querySelector(heading)) {
            // Remove it so we don't duplicate it
            var text = elem.querySelector(heading).innerText,
                element = elem.querySelector(heading);
            if (del)
                element.dataset.simpleDelete = true; // Flag it for removal later
            return text;
        } else {
            return false;
        }
    }

    function getArticleTitle() {
        // Make sure that the pageSelectedContainer isn't empty
        if (pageSelectedContainer == null)
            pageSelectedContainer = document.body;

        // Check to see if there is a h1 within pageSelectedContainer
        var text = checkHeading(pageSelectedContainer, 'h1', true);
        // Check to see if there is a h2 within pageSelectedContainer
        if (!text)
            text = checkHeading(pageSelectedContainer, 'h2', true);
        // Check to see if there is a h3 within pageSelectedContainer
        if (!text)
            text = checkHeading(pageSelectedContainer, 'h3', true);

        // Check to see if there's a h1 within the previous sibling of the article
        if (!text)
            text = checkHeading(pageSelectedContainer.previousElementSibling, 'h1');
        // Check to see if there's a h2 within the previous sibling of the article
        if (!text)
            text = checkHeading(pageSelectedContainer.previousElementSibling, 'h2');
        // Check to see if there's a h3 within the previous sibling of the article
        if (!text)
            text = checkHeading(pageSelectedContainer.previousElementSibling, 'h3');

        if (!text) {
            // Check to see if there's a h1 more generally
            if (document.body.querySelector('h1'))
                return document.body.querySelector('h1').innerText;

            // Check to see if there's a h2 more generally
            if (document.body.querySelector('h2'))
                return document.body.querySelector('h2').innerText;

            // Check to see if there's a h3 more generally
            if (document.body.querySelector('h3'))
                return document.body.querySelector('h3').innerText;
        } else {
            return text;
        }

        // Check meta title
        if (document.head.querySelector("title"))
            return document.head.querySelector("title").innerText;

        return "Unknown title";
    }

    function getArticleAuthor() {
        // Make sure that the pageSelectedContainer isn't empty
        if (pageSelectedContainer == null)
            pageSelectedContainer = document.body;

        var author = null;

        // Check to see if there's an author rel in the article
        var elem = pageSelectedContainer.querySelector('[rel*="author"]');
        if (elem) {
            if (elem.innerText.split(/\s+/).length < 5 && elem.innerText.replace(/\s/g, '') !== "") {
                elem.dataset.simpleDelete = true; // Flag it for removal later
                author = elem.innerText;
            }
        }

        // Check to see if there's an author class
        elem = pageSelectedContainer.querySelector('[class*="author"]');
        if (author === null && elem) {
            if (elem.innerText.split(/\s+/).length < 5 && elem.innerText.replace(/\s/g, '') !== "") {
                elem.dataset.simpleDelete = true; // Flag it for removal later
                author = elem.innerText;
            }
        }

        elem = document.head.querySelector('meta[name*="author"]');
        // Check to see if there is an author available in the meta, if so get it
        if (author === null && elem)
            author = elem.getAttribute("content");

        // Check to see if there's an author rel in the body
        elem = document.body.querySelector('[rel*="author"]');
        if (elem) {
            if (elem.innerText.split(/\s+/).length < 5 && elem.innerText.replace(/\s/g, '') !== "") {
                author = elem.innerText;
            }
        }

        elem = document.body.querySelector('[class*="author"]');
        if (author === null && elem) {
            if (elem.innerText.split(/\s+/).length < 6 && elem.innerText.replace(/\s/g, '') !== "") {
                author = elem.innerText;
            }
        }

        if (author !== null && typeof author !== "undefined") {
            // If it's all caps, try to properly capitalize it
            if (author === author.toUpperCase()) {
                var words = author.split(" "),
                    wordsLength = words.length;
                for (var i = 0; i < wordsLength; i++) {
                    if (words[i].length < 3 && i != 0 && i != wordsLength)
                        words[i] = words[i].toLowerCase(); // Assume it's something like "de", "da", "van" etc.
                    else
                        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase();
                }
                author = words.join(' ');
            }
            return author.replace(/by\s/ig, ''); // Replace "by"
        }

        return "Unknown author";
    }

    // Remove what we added (besides styles)
    function closeOverlay() {
        // Remove the GUI if it is open
        if (typeof datGUI != "undefined" && datGUI.__ul.className != "closed") {
            datGUI.destroy();
            datGUI = undefined;
        }

        // Fade out
        document.body.querySelector("#simple-article").classList.add("simple-fade-up");

        // Reset our variables
        pageSelectedContainer = null;
        selected = null;

        setTimeout(function() {
            // Enable scroll
            document.documentElement.classList.remove("simple-no-scroll");

            // Remove our overlay
            var element = document.querySelector("#simple-article");
            element.parentNode.removeChild(element);

        }, 500); // Make sure we can animate it
    }

    function getContainer() {
        var numWordsOnPage = document.body.innerText.match(/\S+/g).length,
            ps = document.body.querySelectorAll("p");

        // Find the paragraphs with the most words in it
        var pWithMostWords = document.body,
            highestWordCount = 0;

        if (ps.length === 0) {
            ps = document.body.querySelectorAll("div");
        }

        for (var i = 0; i < ps.length; i++) {
            // Make sure it's not in our blacklist
            if (checkAgainstBlacklist(ps[i]) &&
                checkAgainstBlacklist(ps[i].parentNode)) {
                var myInnerText = ps[i].innerText.match(/\S+/g);
                if (myInnerText) {
                    var wordCount = myInnerText.length;
                    if (wordCount > highestWordCount) {
                        highestWordCount = wordCount;
                        pWithMostWords = ps[i];
                        // console.log(checkAgainstBlacklist(ps[i]), checkAgainstBlacklist(ps[i].parentNode))
                    }
                }
            }
        }

        // Keep selecting more generally until over 2/5th of the words on the page have been selected
        var selectedContainer = pWithMostWords,
            wordCountSelected = highestWordCount;

        while (wordCountSelected / numWordsOnPage < 0.4 &&
            selectedContainer != document.body &&
            selectedContainer.parentNode.innerText) {
            selectedContainer = selectedContainer.parentNode;
            wordCountSelected = selectedContainer.innerText.match(/\S+/g).length;
        }

        // Make sure a single p tag is not selected
        if (selectedContainer.tagName === "P") {
            selectedContainer = selectedContainer.parentNode;
        }

        return selectedContainer;
    }


    // Handle link clicks
    function linkListener(e) {
        // Don't change the top most if it's not in the current window
        if (e.ctrlKey ||
            e.shiftKey ||
            e.metaKey ||
            (e.button && e.button == 1) ||
            this.target === "about:blank" ||
            this.target === "_blank") {
            return; // Do nothing
        }

        // Don't change the top most if it's referencing an anchor in the article
        var hrefArr = this.href.split("#");

        if (hrefArr.length < 2 // No anchor
            ||
            (hrefArr[0].replace(/\/$/, "") != top.window.location.origin + top.window.location.pathname.replace(/\/$/, "") // Anchored to an ID on another page
                &&
                hrefArr[0] != "about:blank" &&
                hrefArr[0] != "_blank") ||
            (simpleArticleIframe.getElementById(hrefArr[1]) == null // The element is not in the article section
                &&
                simpleArticleIframe.querySelector("a[name='" + hrefArr[1] + "']") == null)
        ) {
            top.window.location.href = this.href; // Regular link
        } else { // Anchored to an element in the article
            top.window.location.hash = hrefArr[1];
            simpleArticleIframe.location.hash = hrefArr[1];
        }
    }

    // Check given item against blacklist, return null if in blacklist
    var blacklist = ["comment"];

    function checkAgainstBlacklist(elem) {
        if (typeof elem != "undefined" && elem != null) {
            var className = elem.className;
            for (var i = 0; i < blacklist.length; i++) {
                if (typeof className != "undefined" && className.indexOf(blacklist[i]) >= 0) {
                    return null;
                }
            }
        }
        return elem;
    }



    /////////////////////////////////////
    // Extension-related adder functions
    /////////////////////////////////////


    // Add our styles to the page
    function addStylesheet(doc, link, classN) {
        var path = chrome.extension.getURL(link),
            styleLink = document.createElement("link");

        styleLink.setAttribute("rel", "stylesheet");
        styleLink.setAttribute("type", "text/css");
        styleLink.setAttribute("href", path);

        if (classN)
            styleLink.className = classN;

        doc.head.appendChild(styleLink);
    }

    // Add the article author and date
    function addArticleMeta() {
        var editSVG = '<svg class="simple-edit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M422.953,176.019c0.549-0.48,1.09-0.975,1.612-1.498l21.772-21.772c12.883-12.883,12.883-33.771,0-46.654   l-40.434-40.434c-12.883-12.883-33.771-12.883-46.653,0l-21.772,21.772c-0.523,0.523-1.018,1.064-1.498,1.613L422.953,176.019z"></path><polygon fill="#020202" points="114.317,397.684 157.317,440.684 106.658,448.342 56,456 63.658,405.341 71.316,354.683  "></polygon><polygon fill="#020202" points="349.143,125.535 118.982,355.694 106.541,343.253 336.701,113.094 324.26,100.653 81.659,343.253    168.747,430.341 411.348,187.74  "></polygon></g></svg>'

        var metaContainer = document.createElement("div");
        metaContainer.className = "simple-meta";
        var author = document.createElement("div"),
            date = document.createElement("div"),
            title = document.createElement("h1");

        var authorContent = document.createElement("div"),
            dateContent = document.createElement("div"),
            titleContent = document.createElement("div");

        author.className = "simple-author";
        date.className = "simple-date";
        title.className = "simple-title";

        // Check a couple places for the date, othewise say it's unknown
        date.innerHTML = editSVG;
        dateContent.innerHTML = getArticleDate();
        date.appendChild(dateContent);
        // Check to see if there is an author available in the meta, if so get it, otherwise say it's unknown
        author.innerHTML = editSVG;
        authorContent.innerHTML = getArticleAuthor();
        author.appendChild(authorContent);
        // Check h1s for the title, otherwise say it's unknown
        title.innerHTML = editSVG;
        titleContent.innerText = getArticleTitle();
        title.appendChild(titleContent);

        metaContainer.appendChild(date);
        metaContainer.appendChild(author);
        metaContainer.appendChild(title);

        date.querySelector(".simple-edit").onclick = function() {
            editText(dateContent);
        };
        author.querySelector(".simple-edit").onclick = function() {
            editText(authorContent)
        };
        title.querySelector(".simple-edit").onclick = function() {
            editText(titleContent)
        };

        return metaContainer;
    }

    // Add the close button
    function addCloseButton() {
        var closeButton = document.createElement("button");
        closeButton.className = "simple-control simple-close";
        closeButton.textContent = "X";

        return closeButton;
    }



    // Add the delete mode button
    function addDelModeButton() {
        var delModeButton = document.createElement("button");
        delModeButton.className = "simple-control simple-delete";
        delModeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M938.9 668.7V1150c0 7.8-2.5 14.2-7.5 19.2 -5 5-11.4 7.5-19.2 7.5h-53.5c-7.8 0-14.2-2.5-19.2-7.5 -5-5-7.5-11.4-7.5-19.2V668.7c0-7.8 2.5-14.2 7.5-19.2s11.4-7.5 19.2-7.5h53.5c7.8 0 14.2 2.5 19.2 7.5C936.4 654.5 938.9 660.9 938.9 668.7zM1152.8 668.7V1150c0 7.8-2.5 14.2-7.5 19.2 -5 5-11.4 7.5-19.2 7.5h-53.5c-7.8 0-14.2-2.5-19.2-7.5 -5-5-7.5-11.4-7.5-19.2V668.7c0-7.8 2.5-14.2 7.5-19.2 5-5 11.4-7.5 19.2-7.5h53.5c7.8 0 14.2 2.5 19.2 7.5S1152.8 660.9 1152.8 668.7zM1366.7 668.7V1150c0 7.8-2.5 14.2-7.5 19.2 -5 5-11.4 7.5-19.2 7.5h-53.5c-7.8 0-14.2-2.5-19.2-7.5 -5-5-7.5-11.4-7.5-19.2V668.7c0-7.8 2.5-14.2 7.5-19.2 5-5 11.4-7.5 19.2-7.5h53.5c7.8 0 14.2 2.5 19.2 7.5S1366.7 660.9 1366.7 668.7zM1473.6 1273.6V481.6H725v792.1c0 12.3 1.9 23.5 5.8 33.8 3.9 10.3 7.9 17.8 12.1 22.6 4.2 4.7 7.1 7.1 8.8 7.1h695.1c1.7 0 4.6-2.4 8.8-7.1 4.2-4.7 8.2-12.3 12.1-22.6C1471.7 1297.2 1473.6 1285.9 1473.6 1273.6zM912.2 374.6h374.3l-40.1-97.8c-3.9-5-8.6-8.1-14.2-9.2H967.3c-5.6 1.1-10.3 4.2-14.2 9.2L912.2 374.6zM1687.5 401.4v53.5c0 7.8-2.5 14.2-7.5 19.2 -5 5-11.4 7.5-19.2 7.5h-80.2v792.1c0 46.2-13.1 86.2-39.3 119.9 -26.2 33.7-57.6 50.5-94.4 50.5H751.7c-36.8 0-68.2-16.3-94.4-48.9 -26.2-32.6-39.3-72-39.3-118.2V481.6h-80.2c-7.8 0-14.2-2.5-19.2-7.5 -5-5-7.5-11.4-7.5-19.2v-53.5c0-7.8 2.5-14.2 7.5-19.2 5-5 11.4-7.5 19.2-7.5H796l58.5-139.5c8.4-20.6 23.4-38.2 45.1-52.6 21.7-14.5 43.7-21.7 66-21.7H1233c22.3 0 44.3 7.2 66 21.7s36.8 32 45.1 52.6l58.5 139.5h258.2c7.8 0 14.2 2.5 19.2 7.5C1685 387.1 1687.5 393.6 1687.5 401.4z"/><path d="M1075.7 962.9v257.7c0 94.8-78.1 340.3-87 368 -5 15.6-19.5 26.2-35.9 26.2H475.4c-14.6 0-27.9-8.4-34.1-21.6 -0.5-1-48.6-102.4-66.7-133.7 -20.9-36-49.5-79.6-79.8-125.8 -41.4-63.1-88.4-134.7-131.6-210.6 -33.4-58.7-31.3-113.5 5.6-150.4 20.9-21 48.9-32.5 78.7-32.5 0.2 0 0.4 0 0.6 0 29.9 0.1 58 11.9 79.1 33 0.6 0.6 1.2 1.2 1.7 1.8l80.4 92V621.7c0-62 50.1-112.4 111.6-112.4 61.6 0 111.6 50.4 111.6 112.4v123.7c11.3-3.9 23.5-6.1 36.1-6.1 43 0 80.3 24.6 99 60.6 14.7-7.2 31.3-11.3 48.7-11.3 47 0 87.3 29.4 103.7 70.9 13.5-5.9 28.4-9.1 44-9.1C1025.6 850.4 1075.7 900.9 1075.7 962.9zM1000.2 1220.5V962.8c0-20.4-16.2-36.9-36.1-36.9S928 942.5 928 962.8v109.9c0 20.9-16.9 37.8-37.8 37.8 -20.9 0-37.8-16.9-37.8-37.8V901c0-20.4-16.2-36.9-36.1-36.9s-36.1 16.6-36.1 36.9v122.4c0 20.9-16.9 37.8-37.8 37.8 -20.9 0-37.8-16.9-37.8-37.8V851.8c0-20.3-16.2-36.9-36.1-36.9s-36.1 16.6-36.1 36.9v122.4c0 20.9-16.9 37.8-37.8 37.8 -20.9 0-37.8-16.9-37.8-37.8V621.7c0-20.3-16.2-36.9-36.1-36.9 -19.9 0-36.1 16.6-36.1 36.9v545.8c0 15.7-9.8 29.8-24.5 35.3 -14.7 5.5-31.3 1.3-41.7-10.5L273 1025.8c-6.9-6.5-15.8-10.1-25.3-10.1 -9.8 0.1-18.8 3.6-25.5 10.3 -14.4 14.4-4.3 40.4 6.6 59.7 42 73.8 88.3 144.3 129.1 206.5 30.9 47 60 91.5 82 129.3 14.3 24.7 43.7 85.1 59.3 117.7h425.9C951.8 1452.9 1000.2 1283.5 1000.2 1220.5z"/><path class="st0" d="M1000.2 962.8v257.7c0 63-48.4 232.4-75.1 318.7H499.2c-15.6-32.6-45-92.9-59.3-117.7 -21.9-37.8-51.1-82.3-82-129.3 -40.8-62.2-87.1-132.7-129.1-206.5 -11-19.3-21-45.3-6.6-59.7 6.7-6.7 15.7-10.2 25.5-10.3 9.5 0.1 18.5 3.6 25.3 10.1l145.6 166.6c10.3 11.8 27 16 41.7 10.5 14.7-5.5 24.5-19.6 24.5-35.3V621.7c0-20.3 16.2-36.9 36.1-36.9 19.9 0 36.1 16.6 36.1 36.9v352.5c0 20.9 16.9 37.8 37.8 37.8 20.9 0 37.8-16.9 37.8-37.8V851.8c0-20.3 16.2-36.9 36.1-36.9s36.1 16.6 36.1 36.9v171.7c0 20.9 16.9 37.8 37.8 37.8 20.8 0 37.8-16.9 37.8-37.8V901c0-20.4 16.2-36.9 36.1-36.9s36.1 16.6 36.1 36.9v171.7c0 20.9 16.9 37.8 37.8 37.8 20.9 0 37.8-16.9 37.8-37.8V962.8c0-20.4 16.2-36.9 36.1-36.9S1000.2 942.5 1000.2 962.8z"/></svg>';

        return delModeButton;
    }



    // Add the theme editor button
    var datGUI;
    // Add edit meta functionality
    function editText(elem) {
        // Hide the item
        elem.style.display = "none";

        // Insert an input temporarily
        var textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = elem.innerText;

        // Update the element on blur
        textInput.onblur = function() {
            // Change the value
            elem.innerText = textInput.value;

            // Un-hide the elem
            elem.style.display = "block";

            // Remove the input
            textInput.parentNode.removeChild(textInput);
        }

        // Allow enter to be used to save the edit
        textInput.onkeyup = function(e) {
            if (e.keyCode === 13)
                textInput.onblur();
        }

        elem.parentNode.appendChild(textInput);

        textInput.focus();
    }





    /////////////////////////////////////
    // Actually create the iframe
    /////////////////////////////////////

    var simpleArticleIframe,
        isInDelMode = false;
    var pageSelectedContainer;

    function createSimplifiedOverlay() {

        // Create an iframe so we don't use old styles
        var simpleArticle = document.createElement("iframe");
        simpleArticle.id = "simple-article";
        simpleArticle.className = "simple-fade-up no-trans"; // Add fade

        var container = document.createElement("div");
        container.className = "simple-container";

        // Try using the selected element's content
        pageSelectedContainer = selected;

        // If there is no text selected, get auto-select the content
        if (!pageSelectedContainer) {
            pageSelectedContainer = getContainer();

            var pattern = new RegExp("<br/?>[ \r\n\s]*<br/?>", "g");
            pageSelectedContainer.innerHTML = pageSelectedContainer.innerHTML.replace(pattern, "</p><p>");
        }

        selected = pageSelectedContainer;

        // Get the title, author, etc.
        container.appendChild(addArticleMeta())

        // Set the text as our text
        var contentContainer = document.createElement("div");
        contentContainer.className = "content-container";
        contentContainer.innerHTML = pageSelectedContainer.innerHTML;


        // Strip inline styles
        var allElems = contentContainer.getElementsByTagName("*");
        for (var i = 0, max = allElems.length; i < max; i++) {
            var elem = allElems[i];

            if (elem != undefined) {
                elem.removeAttribute("style");
                elem.removeAttribute("color");
                elem.removeAttribute("width");
                elem.removeAttribute("height");
                elem.removeAttribute("background");
                elem.removeAttribute("bgcolor");
                elem.removeAttribute("border");

                // Remove elements that only have &nbsp;
                if (elem.dataset && elem.innerHTML.trim() === '&nbsp;')
                    elem.dataset.simpleDelete = true;


                // See if the pres have code in them
                var isPreNoCode = true;
                if (elem.nodeName === "PRE" && !leavePres) {
                    isPreNoCode = false;

                    for (var j = 0, len = elem.children.length; j < len; j++) {
                        if (elem.children[j].nodeName === "CODE")
                            isPreNoCode = true;
                    }

                    // If there's no code, format it
                    if (!isPreNoCode) {
                        elem.innerHTML = elem.innerHTML.replace(/\n/g, '<br/>')
                    }
                }

                // Replace the depreciated font element and pres without code with ps
                if (elem.nodeName === "FONT" || !isPreNoCode) {
                    var p = document.createElement('p');
                    p.innerHTML = elem.innerHTML;

                    elem.parentNode.insertBefore(p, elem);
                    elem.parentNode.removeChild(elem);
                }

                // Remove any inline style, LaTeX text, or noindex elements and things with aria hidden
                if ((elem.nodeName === "STYLE" ||
                        elem.nodeName === "NOINDEX" ||
                        elem.getAttribute("encoding") == "application/x-tex" ||
                        (elem.getAttribute("aria-hidden") == "true" &&
                            !elem.classList.contains("mwe-math-fallback-image-inline"))))
                    elem.setAttribute("data-simple-delete", true);

                // Show LaTeX plain text on hover
                if (elem.classList.contains("mwe-math-fallback-image-inline")) {
                    var plainText = document.createElement("div");
                    plainText.className = "simple-plain-text";
                    plainText.innerText = elem.alt;
                    elem.parentNode.insertBefore(plainText, elem.nextSibling);
                }
            }
        }

        // Handle RTL sites
        var direction = window.getComputedStyle(document.body).getPropertyValue("direction");
        if (direction === "rtl") {
            container.classList.add("rtl");
        }

        container.appendChild(contentContainer);

        // Remove the elements we flagged earlier
        var deleteObjs = container.querySelectorAll("[data-simple-delete]");
        for (var i = 0, max = deleteObjs.length; i < max; i++) {
            deleteObjs[i].parentNode.removeChild(deleteObjs[i]);
        };

        // Add our iframe to the page
        document.body.appendChild(simpleArticle);

        // Focus the article so our shortcuts work from the start
        document.getElementById("simple-article").focus();

        // Append our custom HTML to the iframe
        simpleArticleIframe = document.getElementById("simple-article").contentWindow.document;
        simpleArticleIframe.body.appendChild(container);

        // Add the close button
        container.appendChild(addCloseButton());



        // Add MathJax support
        var mj = document.querySelector("script[src *= 'mathjax");
        if (mj) {
            var mathjax = document.createElement("script");
            mathjax.src = mj.src;
            simpleArticleIframe.head.appendChild(mathjax);

            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].innerText.indexOf("MathJax.Hub.Config") >= 0) {
                    var clone = scripts[i].cloneNode(true);
                    container.appendChild(clone);
                }
            }
        }

        // Fade in and move up the simple article
        setTimeout(function() {
            // See if we should add the theme editor button
            // if (theme.indexOf("default-styles") !== -1) {
            //     container.appendChild(addGUI());
            // }

            simpleArticle.classList.remove("no-trans");
            simpleArticle.classList.remove("simple-fade-up");

            // Disable scroll on main page until closed
            document.documentElement.classList.add("simple-no-scroll");
        }, 500); // Make sure we can animate it

        // Add the deletion mode button if needed
        if (showDelModeBtn) {
            container.appendChild(addDelModeButton());
        }


        // Add our listeners we need
        // The "X" button listener; exit if clicked
        simpleArticleIframe.querySelector(".simple-close").addEventListener('click', closeOverlay);


        // The deletion mode button
        var sd = simpleArticleIframe.querySelector(".simple-delete");
        if (sd) {
            sd.onclick = function() {
                startDeleteElement(simpleArticleIframe);
            };
        }

        simpleArticleIframe.onkeyup = function(e) {
            // Listen for the "Esc" key and exit if so
            if (e.keyCode === 27 && !simpleArticleIframe.body.classList.contains("simple-deleting"))
                closeOverlay();


            // Listen for CTRL + SHIFT + ; and allow node deletion if so
            if (e.keyCode === 186 && e.ctrlKey && e.shiftKey)
                startDeleteElement(simpleArticleIframe);
        }

        // Listen for CTRL+P and do our print function if so
        simpleArticleIframe.onkeydown = function(e) {
            if (e.ctrlKey && e.keyCode == 80) {
                simpleArticleIframe.defaultView.print();
                e.preventDefault();
            }
        }

        // Size our YouTube containers appropriately
        var youtubeFrames = simpleArticleIframe.querySelectorAll("iframe[src *= 'youtube.com/embed/']");
        for (var i = 0; i < youtubeFrames.length; i++) {
            youtubeFrames[i].parentElement.classList.add("youtubeContainer");
        }
    }


    // Loads the styles after the xhr request finishes
    var theme;

    function continueLoading() {
        // Create a style tag and place our styles in there from localStorage
        var style = document.createElement('style');

        chrome.storage.sync.get('currentTheme', function(result) {
            theme = result.currentTheme || "default-styles.css";
            style.type = 'text/css';

            if (style.styleSheet) {
                style.styleSheet.cssText = stylesheetObj[theme];
            } else {
                style.appendChild(document.createTextNode(stylesheetObj[theme]));
            }


            // Create our version of the article
            createSimplifiedOverlay();

            // Add our required stylesheet for the article
            if (!simpleArticleIframe.head.querySelector(".required-styles"))
                addStylesheet(simpleArticleIframe, "required-styles.css", "required-styles");

            // Change the top most page when regular links are clicked
            var linkNum = simpleArticleIframe.links.length;
            for (var i = 0; i < linkNum; i++)
                simpleArticleIframe.links[i].onclick = linkListener;

            // Navigate to the element specified by the URL # if it exists
            if (top.window.location.hash != null)
                simpleArticleIframe.location.hash = top.window.location.hash;

            // Append our theme styles to the overlay
            simpleArticleIframe.head.appendChild(style);
        });
    }





    /////////////////////////////////////
    // Handle the stylesheet syncing
    /////////////////////////////////////
    var isPaused = false,
        stylesheetObj = {},
        stylesheetVersion = 1.19; // THIS NUMBER MUST BE CHANGED FOR THE STYLESHEETS TO KNOW TO UPDATE
    chrome.storage.sync.set({
        'stylesheet-version': 1
    });
    // Detect past overlay - don't show another
    if (document.getElementById("simple-article") == null) {
        var interval = setInterval(function() {

            // Check to see if the user wants to select the text
            if (typeof useText != "undefined" && useText && !isPaused) {
                // Start the process of the user selecting text to read
                startSelectElement(document);
            }

            if (!isPaused) {
                // Add the stylesheet for the container
                if (!document.head.querySelector(".page-styles"))
                    addStylesheet(document, "page.css", "page-styles");

                // Check to see if the user wants to hide the content while loading
                if (typeof runOnLoad != "undefined" && runOnLoad) {
                    runOnLoad(document);
                }

                // Attempt to mute the elements on the original page
                mutePage();


                // GET THEMES CSS SHEETS FROM CHROME STORAGE

                // Check to see if the stylesheets are already in Chrome storage
                chrome.storage.sync.get(null, function(result) {
                    // Collect all of our stylesheets in our object
                    getStylesFromStorage(result);

                    // Check to see if the default stylesheet needs to be updated
                    var needsUpdate = false;
                    chrome.storage.sync.get('stylesheet-version', function(versionResult) {

                        // If the user has a version of the stylesheets and it is less than the cufrent one, update it
                        if (isEmpty(versionResult) ||
                            versionResult['stylesheet-version'] < stylesheetVersion) {
                            chrome.storage.sync.set({
                                'stylesheet-version': stylesheetVersion
                            });

                            needsUpdate = true;
                        }

                        if (isEmpty(stylesheetObj) // Not found, so we add our default
                            ||
                            needsUpdate) { // Update the default stylesheet if it's on a previous version

                            // Open the default CSS file and save it to our object
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', chrome.extension.getURL('default-styles.css'), true);
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                    // Save the file's contents to our object
                                    stylesheetObj["default-styles.css"] = xhr.responseText;

                                    // Save it to Chrome storage
                                    setStylesOfStorage();

                                    // Continue on loading the page
                                    continueLoading();
                                }
                            }
                            xhr.send();

                            needsUpdate = false;

                            return;
                        }

                        // It's already found, so we use it

                        continueLoading();
                    });


                });

                window.clearInterval(interval);
            }
        }, 100);

    } else {
        if (document.querySelector(".simple-fade-up") == null) // Make sure it's been able to load
            closeOverlay();
    }
}
