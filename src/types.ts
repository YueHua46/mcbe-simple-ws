export interface MessageRES {
    body: {
        message: string,
        receiver: string,
        sender: string,
        type: string
    },
    header: {
        eventName: string,
        messagePurpose: string,
        version: number
    }
}