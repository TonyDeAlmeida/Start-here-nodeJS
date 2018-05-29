//
// Device mode : update firmware of device from LO
// Just enter ypur API KEY where noticed
// at the end : you should find a new file : downloadedFirmware.bin with the content
// you uploaded in Live Objects as the new firmware version
//
var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your key here";                // ENTER API KEY HERE
const mqttTopic = "dev/rsc/upd";
const CLIENT_ID = "urn:lo:nsid:samples:node1";

// classes for json
class LoRessourceUpd{
}
class LoResourceUpdate {
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

// when connected publish your data
client.on("message", function (topic, message) {

  console.log("MQTT::New message\n");
  var response = JSON.parse(message)
  console.log(response);

  // prepare response to LO
  var updateResponse = new LoResourceUpdate();
  updateResponse.cid = response.cid;
  //			The response you send (res member of the updateResponse) may be	:
  //		    "OK" : the update is accepted and will start,
  //		    "UNKNOWN_RESOURCE" : the update is refused, because the resource (identifier) is unsupported by the device,
  //		    "WRONG_SOURCE_VERSION" : the device is no longer in the "current" resource version specified in the resource update request,
  //		    "INVALID_RESOURCE" : the requested new resource version has incorrect version format or metadata,
  //		    "NOT_AUTHORIZED" : the device refuses to update the targeted resource (ex: bad timing, "read-only" resource, etc.)
  //		    "INTERNAL_ERROR" : an error occured on the device, preventing for the requested resource update,
  updateResponse.res = "OK";
  console.log(updateResponse);

  //publish response
  var loResponse = JSON.stringify(updateResponse);
  publishResponse(loResponse);

  // now download the new firmware
  console.log ("Now downloading firmware : "+ response.m.uri)
  downloadFirmware(response.m.uri);

});

client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
});

// publish your response to dev/rsc/upd/res
function publishResponse(message) {
  var clientResp = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

  clientResp.on("connect", function() {

    console.log("MQTT::Connected");
    console.log("sending ack : " + message);

    clientResp.publish("dev/rsc/upd/res", message);
    console.log("MQTT::Ack published");

    clientResp.end();
    console.log("MQTT::Disconnected");

  });
  clientResp.on("error", function(err) {
    console.log("MQTT::Error from client --> ", err);
  });
}

// download firmware
function downloadFirmware(url) {
  var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("downloadedFirmware.bin");
var request = http.get(url, function(response) {
  response.pipe(file);
});
}
