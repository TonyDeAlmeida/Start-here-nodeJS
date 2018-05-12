//
// Device mode : publish config from device to LO
// Just enter ypur API KEY where noticed
//
var mqtt =require('mqtt.js');
const url = "mqtt://liveobjects.orange-business.com:1883";
const apiKey = "enter your api key here";               // ENTER API KEY HERE
const mqttTopic = "dev/cfg";
const CLIENT_ID = "urn:lo:nsid:samples:node1";

// classes for json
class LoCfg{
}
class Cfg {
}
class Param {
}

// fill your data
var loCfg = new LoCfg();
var cfg = new Cfg();
loCfg.cfg=cfg;
var param1 = new Param();
var param2 = new Param();

param1.t="i32";
param1.v=2450;
param2.t="str";
param2.v="myStringValue";

cfg.param1=param1;
cfg.param2=param2;

var serial = JSON.stringify(loCfg);
console.log(serial);

// connect to live Objects
var client = mqtt.connect(url, {username:"json+device",clientId:CLIENT_ID,cleanSession:true, password:apiKey, keepAlive:30})

// when connected publish your data
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
