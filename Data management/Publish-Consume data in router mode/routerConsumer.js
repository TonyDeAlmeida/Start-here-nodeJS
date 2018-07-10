/**
 * Application connects to LO and consumes messages from a Router topic.
 *
 * if you launch multiple instances you will notice that all messages sent are delivered to all instances
 *  but your consumer(s) should be running when the messages are published to Live Objects, else they won't be consumed.
 *  If you need to be able to consume data after they have been published, use the fifo mode to consume them.
 *
 */

var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const APIKEY = "enter your api key here";     // ENTER API KEY HERE
const MQTT_TOPIC = "router/~event/v1/data/#";
const USERNAME  = "payload+bridge";
const CLIENT_ID = "myRouterConsumerClientId";

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

  console.log("MQTT::New message :" + mqttMessage);


})
