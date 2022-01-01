// controller.js
const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://test.mosquitto.org")

const topicName = 'test/connection'


// connect to same client and subscribe to same topic name 
client.on('connect', () => {
    // can also accept objects in the form {'topic': qos}
  client.subscribe(topicName, (err, granted) => {
      if(err) {
          console.log(err, 'err');
      }
      console.log(granted, 'granted')
  })
})


// on receive message event, log the message to the console
client.on('message', (topic, message, packet) => {
  console.log(packet, packet.payload.toString());
  if(topic === topicName) {
   console.log(JSON.parse(message));
  }
})

client.on("packetsend", (packet) => {
    console.log(packet, 'packet2');
})