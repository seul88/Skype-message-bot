# Skype-message-bot

For Poznań Supercomputing and Networking Center.</br>
Application in node.js for sending Skype messagess by HTTP POST method containing JSON parameter.</br>
Fill .env file with your Skype bot credentials before hosting on server.</br>
Send message by passing JSON:</br></br>

{"conversation":</br> {"id":"conversation_id"},</br>
"serviceUrl":"https://smba.trafficmanager.net/apis/",</br>
"text" : "text_of_your_message"}</br></br>

to the /api/CustomWebApi endpoint. </br>
To get conversation_id, simply write any message to your bot - it replies with conversation_id.
