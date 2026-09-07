import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { NewPersonDTO } from "@/src/persons/persons.model";
import { createPerson } from "@/src/persons/persons.service";

interface CreatePlayerProps {
  onSuccess: () => void;
}
export function CreatePlayer({ onSuccess }: CreatePlayerProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [elo, setElo] = useState("");

  const isFormComplete = Boolean(
    firstName.trim() && lastName.trim() && email.trim() && elo,
  );

  return (
    // <main className="flex min-h-svh flex-col items-center px-4 py-12">
    <>
      <h1 className="mb-2">Create Player</h1>
      <p className="mb-8">Add a new player to the rankings</p>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!isFormComplete) {
            return;
          }

          const person: NewPersonDTO = {
            name: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim(),
            elo: Number(elo),
          };

          //API call
          await createPerson(person);
          onSuccess?.();
        }}
        noValidate
        className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6 text-left shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            required
            id="first-name"
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            required
            id="last-name"
            name="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">email</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={elo}
            onChange={(event) => setElo(event.target.value)}
          />
        </div>

        {!isFormComplete && (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Complete all required fields to create a player.
          </p>
        )}

        <Button className="w-full" type="submit" disabled={!isFormComplete}>
          Create player
        </Button>
      </form>
    </>
    // </main>
  );
}
