import type { NewPersonDTO, Person } from "./persons.model";

export const createPerson = async (newPerson: NewPersonDTO) => {
  const url = "http://localhost:5167/api/persons";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  });
  const responseData: Person = await response.json();
  return responseData;
};

export const getPeople = async () => {
  const url = "http://localhost:5167/api/persons";
  const response = await fetch(url);
  const responseData: Person[] = await response.json();
  return responseData;
};

export const deletePerson = async (id: string) => {
  const url = `http://localhost:5167/api/persons/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete player");
  }
};
