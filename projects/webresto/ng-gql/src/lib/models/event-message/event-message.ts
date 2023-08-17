export class EventMessage {
  type: string;
  title: string;
  body: string;

  constructor(type: string, title: string, body: string) {
    this.type = type;
    this.title = title;
    this.body = body;
  }
}

export interface Message {
  id: string;
  title: string;
  type: 'info' | 'error' | 'warn';
  message: string;
}

export interface Action<T = any> {
  id: string;
  type: string;
  data: T;
}
