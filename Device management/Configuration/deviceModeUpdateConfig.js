//
// Device mode : update config of device from LO
//
var mqtt =require('/opt/nodejs/lib/node_modules/mqtt/mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your api key here";                // ENTER API KEY HERE
const mqttTopic = "dev/cfg/upd";
const CLIENT_ID = "urn:lo:nsid:samples:node1";

// classes for json
class LoCfgUpd{
}
class Cfg {
}
class Param {
}
// connect to live Objects
var client = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

client.on("connect", function() {

  console.log("MQTT::Connected");
  client.subscribe(mqttTopic);
  console.log("MQTT::subscribed ok");
  client.end();
  console.log("MQTT::Disconnected");

});

// when connected get configuration data and publish your response
client.on("message", function (topic, message) {

  console.log("MQTT::New message\n");
  var msg = JSON.parse(message)
  console.log(msg);
  
  publishResponse(message);
});

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
});

// publish your response to dev/cfg
function publishResponse(message) {
  var clientResp = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

  clientResp.on("connect", function() {

    console.log("MQTT::Connected");
    console.log("sending ack : " + message);

    clientResp.publish("dev/cfg", message);
    console.log("MQTT::Ack published");

    clientResp.end();
    console.log("MQTT::Disconnected");

  });
}
