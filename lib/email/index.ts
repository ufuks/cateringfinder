export interface EmailProvider{send(input:{to:string;subject:string;html:string}):Promise<void>}
export class ConsoleEmailProvider implements EmailProvider{async send(input:{to:string;subject:string;html:string}){console.info('[email]',{to:input.to,subject:input.subject});}}
