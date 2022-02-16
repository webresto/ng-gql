import type {ValuesOrBoolean} from '../values-or-boolean';

export class EventMessage {
  type: string;
  title: string;
  body: string;

  constructor (type: string, title: string, body: string) {
    this.type = type;
    this.title = title;
    this.body = body;
  }
}

export interface Message {
  title: string;
  type: string;
  message: string;
}

export interface Action {
  type: string;
  data: any;
}

export const MessageOrActionGql = {
  messageVob: <ValuesOrBoolean<Message>> {
    type: true,
    title: true,
    message: true
  },
  actionVob: <ValuesOrBoolean<Action>> {
    data: true,
    type: true
  }
};