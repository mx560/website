import { Action } from './action';

export type Message = {
    user: string;
    content: string;
    sendTime: string;
    action: Action
}
