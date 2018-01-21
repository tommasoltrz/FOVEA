document.addEventListener('DOMContentLoaded', function() {


    var politic_slider = document.getElementById("politic_slider");
    var ui_switch = document.getElementById("ui_switch");
    var ui_switch_output = document.getElementById("ui_switch_output");
    var bubble_switch = document.getElementById("bubble_switch");
    var switch_bubble_output = document.getElementById("switch_bubble_output");

    var bttn = document.getElementById("reset");

    bttn.onclick = function() {
        window.open("db.html");
    }

    bttn.onmousedown = function() {
        bttn.classList.add('clicked');
    };

    bttn.onmouseup = function() {
        bttn.classList.remove('clicked');
    };

    chrome.storage.sync.get('value_politic_slider', function(data) {
        politic_slider.value = data.value_politic_slider;
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
