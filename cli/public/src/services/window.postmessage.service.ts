import { MESSAGE_TYPE, MessagePayload } from '../utils/types';


interface Message<T> extends MessageEvent {
    data: MessagePayload<T>;
}

interface SendMessageType<T> {
    type: MESSAGE_TYPE;
    payload: T;
}

class WindowMessageService {
    private messageMap: Map<MESSAGE_TYPE, (data: any) => void> = new Map();
    constructor() {
        window.addEventListener('message', this.onMessage.bind(this));
    }
    public registerMessage<T>(key: MESSAGE_TYPE, func: (data: T) => void): void {
        this.messageMap.set(key, func);
    }
    public sendMessage<T>(input: SendMessageType<T>): void {
        window.postMessage(input, '*');
    }
    private onMessage<T>(message: Message<T>): void {
        if (this.messageMap.get(message.data.type)) {
            this.messageMap.get(message.data.type)(message.data.payload);
        }
    }
}

export default new WindowMessageService();



