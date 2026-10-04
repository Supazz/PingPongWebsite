import { API_BASE_URL, checkResponse } from "../api";
import type { AdminPerson, NewPersonDTO, Person } from "./persons.model";

export const createPerson = async (newPerson: NewPersonDTO) => {
  const url = `${API_BASE_URL}/api/persons`;
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  });
  checkResponse(response, "Unable to create player. Please try again.");
  const responseData: AdminPerson = await response.json();
  return responseData;
};

export const getPeople = async () => {
  const url = `${API_BASE_URL}/api/persons`;
  const response = await fetch(url);
  checkResponse(response, "Unable to load players. Please try again.");
  const responseData: Person[] = await response.json();
  return responseData;
};

export const deletePerson = async (id: string) => {
  const url = `${API_BASE_URL}/api/persons/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include"
  });

  checkResponse(response, "Unable to delete player. Please try again.");
};

export const getAdminPeople = async (): Promise<AdminPerson[]> => {
  const response = await fetch(`${API_BASE_URL}/api/persons/admin`, {
    credentials: "include",
  });
  checkResponse(response, "Unable to load player details. Please try again.");
  return await response.json();
};
