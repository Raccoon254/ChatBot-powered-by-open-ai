$(document).ready(function () {
    console.log("run success");
    $('#message-form').submit(function(e) {
        e.preventDefault(); // Prevent the form from submitting normally
        console.log("run success");
        var formData = $(this).serialize(); // Serialize the form data
        var sendButton = $('#send-button');
        var spinner = $('#spinner');
        sendButton.find('span').text('');
        sendButton.prop('disabled', true); // Disable the send button
        spinner.show(); // Show the spinner
        $('#chat-area').append(
            '<div class="chat-bubble"><span class="user-message">' +
            decodeURIComponent(formData.split('=')[1]).replace(/\+/g, ' ') + '</span></div>');
                        // Clear the input field
                        $('#message').val('');
        
        $.ajax({
            type: 'POST',
            url: 'process.php',
            data: formData,
            success: function(response) {
                // Append the response to the chat area

                $('#chat-area').append(
                    '<div class="chat-bubble"><span class="bot-message">' +
                    response + '</span></div>');

                // Scroll to the bottom of the chat area
                $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
            },
            error: function() {
                alert('Error processing request');
            },
            complete: function() {
                spinner.hide(); // Hide the spinner
                sendButton.prop('disabled', false); // Enable the send button
                sendButton.find('span').text('Send');
            }
        });
    });
});