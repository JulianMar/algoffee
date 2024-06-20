import { Client, Message } from 'node-osc';

export default eventHandler(async (obj) => {
    const client = new Client('192.168.68.59', 8010);

    client.send(new Message(`/surfaces/Algoffee/${obj.path.split('?')[1].split('=')[1]}/visible`, true))
})
