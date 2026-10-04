export type NewPersonDTO = {
  name: string;
  email: string;
  elo: number;
};

export type Person = {
  id: string;
  name: string;
  elo: number;
};

export type AdminPerson = Person & {
  email: string;
};
