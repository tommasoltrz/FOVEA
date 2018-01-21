var bttn = document.getElementById("save");
var left = document.getElementById("left_text");
var center = document.getElementById("center_text");
var right = document.getElementById("right_text");

chrome.storage.sync.get('left_db', function(data) {
    left.value = data.left_db;
});
chrome.storage.sync.get('center_db', function(data) {
    center.value = data.center_db;
});
chrome.storage.sync.get('right_db', function(data) {
    right.value = data.right_db;
});

bttn.onclick = function() {
    // left.value = (left.value.slice(0, -1));
    // center.value = (left.value.slice(0, -1));
    // right.value = (left.value.slice(0, -1));
    chrome.storage.sync.set({
        'left_db': left.value,
        'center_db': center.value,
        'right_db': right.value,
    });
}
