import { WebSocket } from 'ws'
import { v4 as uuid } from 'uuid'
import { MessageRES } from './types'
import { send as run } from './send'

const port = 3000

const wss = new WebSocket.Server({port})

console.log(`服务启动在：ws://localhost:${port}`)

wss.on('connection',socket => {
    console.log('连接成功')
    // 告诉 Minecraft 发送所有聊天消息。Minecraft启动时需要一次
    socket.send(JSON.stringify({
        header: {
            requestId: uuid(),
            messagePurpose: 'subscribe',
            version: 1,
            messageType: 'commandRequest'
        },
        body: {
            eventName: 'PlayerMessage'
        }
    }))
    
    // 当MineCraft发送消息时(例如在玩家聊天中)，采取行动。
    socket.on('message', packet => {
        const res = JSON.parse(packet.toString()) as MessageRES
        const match = res.body.message && res.body.message.match(/^summon (.+)$/)
        const entity = match && match[1]

        // 如果玩家发送消息“summon”后跟一个实体名称，则召唤该实体。
        if (entity) {
            socket.send(run(`summon ${entity}`))
        }

        if (res.header.eventName === 'PlayerMessage') {
            let sender = res.body.sender;
            let message = res.body.message;
            console.log(`${sender}: ${message}`)
        }
    });
})

