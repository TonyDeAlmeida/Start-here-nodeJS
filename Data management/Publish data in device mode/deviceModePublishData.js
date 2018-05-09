//
// Dervice mode : publish data from device to LO
// Just enter ypur API KEY where noticed
//

var mqtt =require('/opt/nodejs/lib/node_modules/mqtt/mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your key here";                             // enter your API-KEY here
const mqttTopic = "dev/data/node";
const CLIENT_ID = "urn:lo:nsid:samples:node1";

// classes for json
class LoData {
}
class Payload {
}

// fill your data
var data = new LoData();
data.s="nodeStream";
var payload = new Payload();
payload.temperature=29;
payload.hygrometry =87;
data.v=payload;

var serial = JSON.stringify(data);
console.log(serial);

// connect to live Objects
var client = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

// when connected publish your data
client.on("connect", function() {

  console.log("MQTT::Connected");
  client.publish(mqttTopic, serial);
  console.log("MQTT::Data published");
  client.end();
  console.log("MQTT::Disconnected");


});

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
});
