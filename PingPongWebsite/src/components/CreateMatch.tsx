import { useEffect, useState } from "react";
import { ChevronDownIcon, Swords } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getPeople } from "@/src/persons/persons.service";
import type { Person } from "@/src/persons/persons.model";
import type { NewMatchDTO } from "@/src/Matches/matches.model";
import { createMatch } from "@/src/Matches/matches.service";

interface CreateMatchProps {
  onSuccess?: () => void;
}

export function CreateMatch({ onSuccess }: CreateMatchProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [matchTime, setMatchTime] = useState("");

  const isFormComplete = Boolean(player1 && player2 && date && matchTime);
  const isDuplicatePlayers = Boolean(player1 && player2 && player1 === player2);
  const canSubmit = isFormComplete && !isDuplicatePlayers;

  const loadPeople = async () => {
    const peopleFromApi = await getPeople();

    const alphabetizedPeople = [...peopleFromApi].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );

    setPeople(alphabetizedPeople);
  };

  useEffect(() => {
    void loadPeople();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Match</h1>
        <p className="mt-1 text-muted-foreground">
          Select the players, date, and time for the match.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (
              !player1 ||
              !player2 ||
              !date ||
              !matchTime ||
              isDuplicatePlayers
            ) {
              return;
            }
            const selectedPlayer1 = player1;
            const selectedPlayer2 = player2;
            const matchDateTime = `${format(date, "yyyy-MM-dd")}T${matchTime}`;

            const match: NewMatchDTO = {
              p1: selectedPlayer1,
              p2: selectedPlayer2,
              date: matchDateTime,
            };
            await createMatch(match);
            await onSuccess?.();
          }}
          noValidate
          className="space-y-6"
        >
          {/* Players */}
          <FieldGroup className="grid gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="player-1">Player 1</FieldLabel>

              <Combobox
                value={player1}
                onValueChange={(value) => setPlayer1(value ?? "")}
                itemToStringLabel={(item) => {
                  const person = people.find((person) => person.id === item);
                  return person?.name ?? "";
                }}
              >
                <ComboboxInput id="player-1" placeholder="Select Player 1" />

                <ComboboxContent>
                  <ComboboxEmpty>No players found.</ComboboxEmpty>

                  {people.map((person) => (
                    <ComboboxItem key={person.id} value={person.id}>
                      {person.name}
                    </ComboboxItem>
                  ))}
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel htmlFor="player-2">Player 2</FieldLabel>

              <Combobox
                value={player2}
                onValueChange={(value) => setPlayer2(value ?? "")}
                itemToStringLabel={(item) => {
                  const person = people.find((person) => person.id === item);
                  return person?.name ?? "";
                }}
              >
                <ComboboxInput id="player-2" placeholder="Select Player 2" />

                <ComboboxContent>
                  <ComboboxEmpty>No players found.</ComboboxEmpty>

                  {people.map((person) => (
                    <ComboboxItem key={person.id} value={person.id}>
                      {person.name}
                    </ComboboxItem>
                  ))}
                </ComboboxContent>
              </Combobox>
            </Field>
          </FieldGroup>

          {/* Date & Time */}
          <FieldGroup className="grid gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="date-picker">Date</FieldLabel>

              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-full justify-between font-normal"
                    >
                      {date ? format(date, "PPP") : "Select date"}

                      <ChevronDownIcon data-icon="inline-end" />
                    </Button>
                  }
                />

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    defaultMonth={date}
                    captionLayout="dropdown"
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setDateOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <FieldLabel htmlFor="time-picker">Time</FieldLabel>

              <Input
                required
                name="matchTime"
                type="time"
                id="time-picker"
                step="1"
                value={matchTime}
                onChange={(event) => setMatchTime(event.target.value)}
              />
            </Field>
          </FieldGroup>

          {!isFormComplete && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Complete all required fields to create a match.
            </p>
          )}

          {isDuplicatePlayers && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              You can't choose duplicate players!
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button type="submit" disabled={!canSubmit}>
              <Swords />
              Create match
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
