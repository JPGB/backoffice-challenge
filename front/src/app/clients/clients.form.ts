export class ClientForm {
  constructor(
    public name: string,
    public email: string,
    public identification: string,
    public agency: string,
    public active: boolean,
  ) { }
}