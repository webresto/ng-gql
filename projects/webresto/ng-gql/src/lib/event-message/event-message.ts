export class EventMessage {
  type:string;
  title:string;
  body:string;

  constructor(type, title, body) {
    this.type = type;
    this.title = title;
    this.body = body;
  }
}
