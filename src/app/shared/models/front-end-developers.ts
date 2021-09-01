export class HobbyModel{
  constructor(public name: string, public duration: number)
  {}
}

export interface FrontEndDeveloperModel{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: string;
  frameworkVersion: string;
  email: string;
  hobby: Array<HobbyModel>;
}
