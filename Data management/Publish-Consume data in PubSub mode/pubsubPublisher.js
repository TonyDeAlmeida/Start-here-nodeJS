//
// pubSub publisher : publish data from device to LO in pubsub mode
// Just enter ypur API KEY where noticed
//
var mqtt =require('/opt/nodejs/lib/node_modules/mqtt/mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your api key here";     // ENTER API KEY HERE
const USERNAME  = "payload+bridge";
const mqttTopic = "pubsub/pubSubSampleTopic";
const CLIENT_ID = "myClientId";

var message = "Message published in puSub mode from pubsubPublisher.js";

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
