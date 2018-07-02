//
// pubSub consumer : consume data from device publishing in pupsub mode to LO
// Just enter ypur API KEY where noticed
//
// You MUST first start this consumer before publishing, else data will be lost !
//

var mqtt =require('/opt/nodejs/lib/node_modules/mqtt/mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your api key here";     // ENTER API KEY HERE
const USERNAME  = "payload+bridge";
const mqttTopic = "pubsub/pubSubSampleTopic";

var client  = mqtt.connect(url, {username:USERNAME, password:apiKey, keepAlive:30})

client.on("connect", function() {
  console.log("MQTT::Connected");

  client.subscribe(mqttTopic)
  console.log("MQTT::Subscribed to topic:", mqttTopic);
})

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
})

client.on("message", function (topic, message) {

  console.log("Received message from pubsubTopic : " + message);

})
