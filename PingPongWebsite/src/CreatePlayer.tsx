import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { NewPersonDTO } from "./persons/persons.model";
import { createPerson } from "./persons/persons.service";

interface CreatePlayerProps {
  onSuccess: () => void;
}
export function CreatePlayer({ onSuccess }: CreatePlayerProps) {
  return (
    // <main className="flex min-h-svh flex-col items-center px-4 py-12">
    <>
      <h1 className="mb-2">Create Player</h1>
      <p className="mb-8">Add a new player to the rankings</p>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          const firstName = String(formData.get("firstName"));
          const lastName = String(formData.get("lastName"));
          const email = String(formData.get("email"));
          const elo = Number(formData.get("elo"));

          const person: NewPersonDTO = {
            name: `${firstName} ${lastName}`,
            email: email,
            elo: elo,
          };

          //API call
          await createPerson(person);
          onSuccess?.();
        }}
        className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6 text-left shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            required
            id="first-name"
            name="firstName"
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            required
            id="last-name"
            name="lastName"
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">email</Label>
          <Input
            required
            id="email"
            name="email"
            min="0"
            placeholder="Enter email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="elo">Starting Elo</Label>
          <Input
            required
            id="elo"
            name="elo"
            type="number"
            min="0"
            placeholder="100"
          />
        </div>

        <Button className="w-full" type="submit">
          Create player
        </Button>
      </form>
    </>
    // </main>
  );
}
