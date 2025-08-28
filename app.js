const widget = document.getElementsByClassName('widget');

for (let i = 0; i < widget.length; i++) {
    widget[i].onclick = function() {
        console.log('Widget clicked!');
    }
}