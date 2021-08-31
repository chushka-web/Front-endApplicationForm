export interface HobbyModel{
  name: string;
  duration: number;
}

export interface FrontEndDeveloperModel{
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  framework: string;
  frameworkVersion: string;
  email: string;
  hobby: Array<HobbyModel>;
}
