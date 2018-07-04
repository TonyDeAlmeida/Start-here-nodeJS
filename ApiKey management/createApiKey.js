/**
 * This utility will create a new API_KEY to use it from your device
 * To get your tenantId and parentId, you can use the swagger tool
 * "Listing all the API keys of the connected Tenant" 
 * from https://liveobjects.orange-business.com/#/faq -> swagger/API keys
 install node-rest-client befrore runnig this sample
 **/

var Client = require('node-rest-client').Client;

const SERVER = "https://liveobjects.orange-business.com/api/v0/";   // declare endpoints
const API_KEY = "enter your key here"; 				        // <-- REPLACE by YOUR API_KEY!
const TENANT_ID="enter your tenant id here";						// <-- REPLACE by your Tenant ID
const PARENT_ID="enter the parent id here";						// <-- REPLACE by the parent id

class ApiKey{
}

var newKey = new ApiKey();
var roles= new Array();
roles[0] ="DEVICE_ACCESS";

newKey.tenantId = TENANT_ID;
newKey.parentId = PARENT_ID;
newKey.active   = true;
newKey.label    = "myKey";
newKey.description = "rest created key";
newKey.roles=roles;

var client = new Client();

var args = {
    data : newKey,
    headers: { "Content-Type": "application/json","X-API-Key":API_KEY}
};

client.post( SERVER+"apiKeys",args,function (data, response) {
    // parsed response body as js object
    console.log(data);
    console.log("-------------------RESPONSE-----------------------");
    // raw response if you are curious
   // console.log(response);
});
