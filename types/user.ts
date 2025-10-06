export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type RandomUserName = {
  title: string;
  first: string;
  last: string;
}

export type RandomUserPicture = {
  large: string;
  medium: string;
  thumbnail: string;
}

export type RandomUser = {
  gender: string;
  name: RandomUserName;
  email: string;
  picture: RandomUserPicture;
  login: {
    uuid: string;
  };
}

export type RandomUserResponse = {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
