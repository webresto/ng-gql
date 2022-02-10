export class EventMessage {
  type: string;
  title: string;
  body: string;

  constructor ( type: string, title: string, body: string ) {
    this.type = type;
    this.title = title;
    this.body = body;
  }
}

export interface Message {
  title: String;
  type: String;
  message: String;
}

export interface Action {
  type: String;
  data: any;
}