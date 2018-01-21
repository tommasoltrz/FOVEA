client = new Paho.MQTT.Client("172.20.10.5", Number(1884), "sitoweb");

// set callback handlers
client.onMessageArrived = onMessageArrived;

client.connect({
    onSuccess: onConnect
});

// called when the client connects
function onConnect() {
    console.log("connected");
    client.subscribe("friends");
    client.subscribe("UI");
    client.subscribe("bubble");
    client.subscribe("slider");
}

function onMessageArrived(message) {
    console.log(message.topic + " " + message.payloadString);

    if (message.topic == "friends") {
        if (message.payloadString == "ON") {
            chrome.storage.sync.set({
                'value_friends_switch': "On"
            });
        } else {
            chrome.storage.sync.set({
                'value_friends_switch': "Off"
            });
        }
    }

    if (message.topic == "UI") {
        if (message.payloadString == "ON") {
            chrome.storage.sync.set({
                'value_ui_switch': "On"
            });
        } else {
            chrome.storage.sync.set({
                'value_ui_switch': "Off"
            });
        }
    }

    if (message.topic == "bubble") {
        if (message.payloadString == "ON") {
            chrome.storage.sync.set({
                'value_bubble_switch': "Outside"
            });
        } else {
            chrome.storage.sync.set({
                'value_bubble_switch': "Inside"
            });
        }
    }

    if (message.topic == "slider") {
        chrome.storage.sync.set({
            'value_politic_slider': message.payloadString
        });
    }

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id);
    });
}



var checkVisit = function(url_to_be_checked, callback) {
    chrome.history.getVisits({
        url: url_to_be_checked,
    }, function(results) {
        // console.log(results);
        callback(results);
    });
};

var blocked = false;
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "blockurls");
    port.onMessage.addListener(function(msg) {
        var url_to_be_checked = msg.url
        checkVisit(url_to_be_checked, function(results) {
            console.log(results.length);
            if (results.length != 0 && results.length != 1) blocked = true;
            else blocked = false;
            port.postMessage({
                isblocked: blocked
            });
        });
    });
});




function startJustRead(tab) {
    var tabId = tab ? tab.id : null; // Defaults to the current tab
    chrome.tabs.executeScript(tabId, {
        file: "content_script.js", // Script to inject into page and run in sandbox
        allFrames: false // This injects script into iframes in the page and doesn't work before 4.0.266.0.
    });

    // Add a badge to signify the extension is in use
    chrome.browserAction.setBadgeBackgroundColor({
        color: [242, 38, 19, 230]
    });
    chrome.browserAction.setBadgeText({
        text: "on"
    });

    setTimeout(function() {
        chrome.browserAction.setBadgeText({
            text: ""
        });
    }, 2000);
}



function createPageCM() {
    // Create a right click menu option
    pageCMId = chrome.contextMenus.create({
        title: "View this page using Just Read",
        id: "pageCM",
        contexts: ["page"],
        onclick: startJustRead
    });
}

function createLinkCM() {
    // Create an entry to allow user to open a given link using Just read
    linkCMId = chrome.contextMenus.create({
        title: "View the linked page using Just Read",
        id: "linkCM",
        contexts: ["link"],
        onclick: function(info, tab) {
            chrome.tabs.create({
                    url: info.linkUrl,
                    active: false
                },
                function(newTab) {
                    chrome.tabs.executeScript(newTab.id, {
                        code: 'var runOnLoad = true'
                    }, function() {
                        startJustRead(newTab);
                    });
                }
            );

        }
    });
}


var pageCMId = highlightCMId = linkCMId = undefined;

function updateCMs() {
    chrome.storage.sync.get(["enable-pageCM", "enable-highlightCM", "enable-linkCM"], function(result) {
        var size = 0;

        for (var key in result) {
            size++;

            if (key === "enable-pageCM") {
                if (result[key]) {
                    if (typeof pageCMId == "undefined")
                        createPageCM();
                } else {
                    if (typeof pageCMId != "undefined") {
                        chrome.contextMenus.remove("pageCM");
                        pageCMId = undefined;
                    }
                }
            } else if (key === "enable-highlightCM") {
                if (result[key]) {
                    if (typeof highlightCMId == "undefined")
                        createHighlightCM();
                } else {
                    if (typeof highlightCMId != "undefined") {
                        chrome.contextMenus.remove("highlightCM");
                        highlightCMId = undefined;
                    }
                }
            } else if (key === "enable-linkCM") {
                if (result[key]) {
                    if (typeof linkCMId == "undefined")
                        createLinkCM();
                } else {
                    if (typeof linkCMId != "undefined") {
                        chrome.contextMenus.remove("linkCM");
                        linkCMId = undefined;
                    }
                }
            }
        }

        if (size === 0) {
            createPageCM();
            createHighlightCM();
            createLinkCM();
        }
    });
}



// // Add our context menus
// updateCMs();
//
// chrome.storage.sync.get("show-del-btn", function(result) {
//     if (result["show-del-btn"] === "undefined") {
//         chrome.storage.sync.set("show-del-btn", true);
//     }
// });

// // Listen for the keyboard shortcut
// chrome.commands.onCommand.addListener(function(command) {
//     if(command == "open-just-read")
//         startJustRead();
//     if(command == "select-text")
//         startSelectText();
// });







chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.updateCMs === "true") {
            updateCMs();
        }
    }
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading') {
        // Auto enable on sites specified
        chrome.storage.sync.get('auto-enable-site-list', function(siteListObj) {
            var siteList = siteListObj['auto-enable-site-list'],
                url = tab.url;

            if (typeof siteList != "undefined") {
                for (var i = 0; i < siteList.length; i++) {
                    var regex = new RegExp(siteList[i], "i");

                    if (url.match(regex)) {
                        chrome.tabs.executeScript(tabId, {
                            code: 'var runOnLoad = true;' // Ghetto way of signaling to run on load
                        }, function() { // instead of using Chrome messages
                            startJustRead(tab);
                        });
                    }
                }
            }
        });
    }
});
