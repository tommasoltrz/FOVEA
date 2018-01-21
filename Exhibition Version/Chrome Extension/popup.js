document.addEventListener('DOMContentLoaded', function() {


    var politic_slider = document.getElementById("politic_slider");

    var trending_switch = document.getElementById("trending_switch");
    var trending_switch_output = document.getElementById("trending_switch_output");

    var friends_switch = document.getElementById("friends_switch");
    var friends_switch_output = document.getElementById("friends_switch_output");

    var ui_switch = document.getElementById("ui_switch");
    var ui_switch_output = document.getElementById("ui_switch_output");

    var bubble_switch = document.getElementById("bubble_switch");
    var switch_bubble_output = document.getElementById("switch_bubble_output");




    chrome.storage.sync.get('value_politic_slider', function(data) {
        politic_slider.value = data.value_politic_slider;
    });

    chrome.storage.sync.get('value_trending_switch', function(data) {
        trending_switch_output.innerHTML = data.value_trending_switch;
        if (data.value_trending_switch == "On") trending_switch.checked = true;
    });
    chrome.storage.sync.get('value_friends_switch', function(data) {
        friends_switch_output.innerHTML = data.value_friends_switch;
        if (data.value_friends_switch == "On") friends_switch.checked = true;
    });
    chrome.storage.sync.get('value_ui_switch', function(data) {
        ui_switch_output.innerHTML = data.value_ui_switch;
        if (data.value_ui_switch == "On") ui_switch.checked = true;
    });
    chrome.storage.sync.get('value_bubble_switch', function(data) {
        switch_bubble_output.innerHTML = data.value_bubble_switch;
        if (data.value_bubble_switch == "Outside") bubble_switch.checked = true;
    });


    politic_slider.oninput = function() {
        var val = this.value;
        chrome.storage.sync.set({
            'value_politic_slider': val
        });
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                pilitic_slider_val: val
            }, function(response) {});
        });
    }

    trending_switch.onclick = function() {
        if (trending_switch.checked) trending_switch_output.innerHTML = "On";
        else trending_switch_output.innerHTML = "Off";
        chrome.storage.sync.set({
            'value_trending_switch': trending_switch_output.innerHTML
        });
    }
    friends_switch.onclick = function() {
        if (friends_switch.checked) friends_switch_output.innerHTML = "On";
        else friends_switch_output.innerHTML = "Off";
        chrome.storage.sync.set({
            'value_friends_switch': friends_switch_output.innerHTML
        });
    }
    ui_switch.onclick = function() {
        if (ui_switch.checked) ui_switch_output.innerHTML = "On";
        else ui_switch_output.innerHTML = "Off";
        chrome.storage.sync.set({
            'value_ui_switch': ui_switch_output.innerHTML
        });
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    readjust: ui_switch.checked ? true : false
                }, function(response) {});
            });
    }
    bubble_switch.onclick = function() {
        if (bubble_switch.checked) switch_bubble_output.innerHTML = "Outside";
        else switch_bubble_output.innerHTML = "Inside";
        chrome.storage.sync.set({
            'value_bubble_switch': switch_bubble_output.innerHTML
        });
    }


});
