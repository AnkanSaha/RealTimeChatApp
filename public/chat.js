window.onload = function() {

    var messages = [];
    let socket = io.connect('https://xclub.org.in');
    let field = document.getElementById("field");
    let sendButton = document.getElementById("send");
    let content = document.getElementById("content");
    let name = document.getElementById("name");
    const PingSound = new Audio('Ping.mp3')

    //message listener
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b id="ankan">' + (messages[i].username ? messages[i].username : 'Bot') + ': &nbsp;</b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            PingSound.play()
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
    // button to send message to socket
    sendButton.onclick = function() {
    	if(name.value == "") {
            alert("Please type your Name");
        } else {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
        field.value = '';
        }
    };
    // set enter key listener 
    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});
}

