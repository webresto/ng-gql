import {DialogBoxConfig} from './dialog-box';

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

export type Action =
  | {
      id: string;
      type: string;
      data: any;
    }
  | {
      id: string;
      type: 'Redirect';
      data: {
        link: string;
      };
    }
  | {
      id: string;
      type: 'dialog-box';
      data: {
        askId: string;
        answerId: string | null;
        deviceId: string;
        config: DialogBoxConfig;
      };
    };
