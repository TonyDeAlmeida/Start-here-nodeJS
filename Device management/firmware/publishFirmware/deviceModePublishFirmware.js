//
// Device mode : publish firmware from device to LO
// Just enter ypur API KEY where noticed
//
var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your key here";     // ENTER API KEY HERE
const mqttTopic = "dev/rsc";
const CLIENT_ID = "urn:lo:nsid:samples:node1";

class LoRessource{
}
class SampleRessource {
}
class SampleFirmware {
}

var myFirmware = new SampleFirmware();
myFirmware.v="V1.0";

var resource1 = new SampleRessource();
resource1.sampleFirmware=myFirmware;

var loRessource = new LoRessource();
loRessource.rsc = resource1;

var serial = JSON.stringify(loRessource);
console.log(serial);
var client = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

client.on("connect", function() {

  console.log("MQTT::Connected");
  client.publish(mqttTopic, serial);
  console.log("MQTT::Infos published");
  client.end();
  console.log("MQTT::Disconnected");
});

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
});
