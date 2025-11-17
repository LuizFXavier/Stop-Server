export interface IMessage {
    to: string | string[];
    from?: string;
    subject: string;
    body: string; 
}
  
export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>;
}