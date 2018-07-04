/**
 * Application connects to LO and publish messages to the router.
 *
 * Messages can be consume from a "routerConsumer", but your consumer application has to be running before you send messages from the publisher
 * You can also consume message in fifo mode (use the MqttFifoSample (FifoConsumer.java) after having declared a binding in Live Objects.
 * In that case your message can be consumed
 *
 */
var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your api key here";     // ENTER API KEY HERE
const USERNAME  = "payload+bridge";
const mqttTopic = "fifo/sampleFifo";
const CLIENT_ID = "myClientId";

var message = "Message published in fifo mode from fifoPublisher.js";

console.log(message);
var client = mqtt.connect(url, {username:USERNAME,clientId:CLIENT_ID, password:apiKey, keepAlive:30})

client.on("connect", function() {

  console.log("MQTT::Connected");
  client.publish(mqttTopic, message);
  console.log("MQTT::Infos published");
  client.end();
  console.log("MQTT::Disconnected");

});

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
});
