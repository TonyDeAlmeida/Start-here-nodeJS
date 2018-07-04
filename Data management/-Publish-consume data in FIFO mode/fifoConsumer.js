/**
 * Application connects to LO and consumes messages from a FIFO queue.
 * You MUST first create a FIFO called "sampleFifo" in your LO account, before trying to consume from !
 * if you launch multiple instances you will notice the load balancing of the messages sent)
 * if you launch the consumer after messages been published, these old messages will be delivered in the right order
 */

var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const APIKEY = "enter your api key here";     // ENTER API KEY HERE
const MQTT_TOPIC = "fifo/sampleFifo";
const USERNAME  = "payload+bridge";
const CLIENT_ID = "myFifoClientId";

/** connect **/
console.log("MQTT::Connecting to ");
var client  = mqtt.connect(url, {username:USERNAME,clientId:CLIENT_ID, password:APIKEY, keepAlive:30})


client.on("connect", function() {
  console.log("MQTT::Connected");

  client.subscribe(MQTT_TOPIC)
  console.log("MQTT::Subscribed to topic:", MQTT_TOPIC);
})


client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
})

client.on("message", function (topic, mqttMessage) {

  console.log("MQTT::New message : " +mqttMessage);
//  uncomment below if data published from device mode
//  var message = JSON.parse(mqttMessage);
//  console.log("mqttMessage devEui : ", message.metadata.source.split(':')[4]);
//  console.log("mqttMessage timestamp : ", message.timestamp);
//  console.log("mqttMessage payload: ", message.value.payload);

})
