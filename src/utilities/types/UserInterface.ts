import { ProjectInterface } from './ProjectInterface';

export interface UserInterface {
  bio: string;
  customProfileLinks: Array<any>;
  declinedProjects?: ProjectInterface[];
  email: string;
  firstName: string;
  interestedProjects?: ProjectInterface[];
  lastName: string;
  linkedinUrl: string;
  memberOfProjects?: ProjectInterface[];
  ownerOfProjects?: ProjectInterface[];
  portfolioUrl: string;
  portfolioProjects?: ProjectInterface[];
  profilePicture: string;
  role: string;
  savedProjects?: ProjectInterface[];
  __v?: number;
  _id: string;
}

export interface CustomUrlInterface {
  _id: string;
  customUrlName: string;
  customUrlLink: string;
}

export interface UiSliceInterface {
  auth: {
    user: UserInterface;
  };
  sidebar: {
    visibleSidebar: boolean;
  };
  status: {
    isAuthenticated: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: {
      // status + message should not be conditional? if there is an error. Any error should return the status and a message to describe it
      status?: boolean;
      message?: string;
    };
  };
}

export interface SignUpInterface {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// export interface PortfolioProjectInterface {

// }
