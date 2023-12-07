import { v4 as uuid } from "uuid"

export function send(command:string) {
    return JSON.stringify({
            header: {
                requestId: uuid(),
                messagePurpose: 'commandRequest',
                version: 1,
                messageType: 'commandRequest'
            },
            body: {
                origin: {
                    type: 'player'
                },
                commandLine: command,
                version: 1
            }
    })
}