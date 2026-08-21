import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Admin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [elo, setELo] = useState("");


  return (
    // <main className="flex min-h-svh flex-col items-center px-4 py-12">
    <div className="flex min-h-svh flex-col items-center px-4 py-12">
      <h1 className="mb-2">Create Player</h1>
      <p className="mb-8">Add a new player to the rankings</p>

      <form className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6 text-left shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            id="first-name"
            name="firstName"
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" name="lastName" placeholder="Enter last name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="elo">Starting Elo</Label>
          <Input id="elo" name="elo" type="number" min="0" placeholder="100" />
        </div>

        <Button  onClick={aysnc () => {
          
        }} className="w-full" type="submit">
          Create player
        </Button>
      </form>
    </div>
    // </main>
  );
}
