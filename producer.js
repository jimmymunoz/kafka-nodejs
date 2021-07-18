const { Kafka } = require('kafkajs')
const Chance = require('chance')
 
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
})
 
const producer = kafka.producer()
const topic = 'animals'
 
const produceMessages = async () => {
  const chance = new Chance()
  try {
    const value = chance.animal()
    const messages =[{ value }]
    await producer.send({
      topic,
      messages
    })
  } catch (e) {
    console.error('produceMessages', e);
  }
}

const run = async () => {
  // Producing
  await producer.connect()
  setInterval(produceMessages, 1000);
  
}
 
run().catch(console.error)