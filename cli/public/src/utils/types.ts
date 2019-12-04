export enum MESSAGE_TYPES {
    LOGIN_SUCCESS
}

export type MESSAGE_TYPE = keyof typeof MESSAGE_TYPES;

export interface MessagePayload<T> {
    type: MESSAGE_TYPES;
    payload: T;
}
