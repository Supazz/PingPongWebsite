import { useId, useState } from "react";
import { ClipboardList, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scoreMatch } from "../Matches/matches.service";

interface RefMatchProps {
  matchId: string;
  player1Name: string;
  player2Name: string;
  scheduledTime: string;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

export function RefMatch({
  matchId,
  player1Name,
  player2Name,
  scheduledTime,
  onClose,
  onSuccess,
}: RefMatchProps) {
  const [gameCount, setGameCount] = useState<3 | 5>(3);
  const [scores, setScores] = useState(() =>
    Array.from({ length: 5 }, () => ["", ""]),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const id = useId();

  return (
    <section className="mx-auto w-full max-w-2xl p-4 text-left sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ClipboardList className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id="ref-match-title"
            className="m-0 text-2xl font-bold tracking-tight"
          >
            Ref Match
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the match format. Leave unplayed games blank.
          </p>
        </div>
        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close scoring"
            disabled={isSaving} onClick={onClose}
          >
            <X />
          </Button>
        )}
      </div>

      <div className="mb-6 rounded-xl border bg-muted/50 p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Player 1</p>
            <p className="mt-1 break-words font-semibold">{player1Name}</p>
          </div>
          <span className="text-xs font-medium uppercase text-muted-foreground">
            vs
          </span>
          <div className="min-w-0 text-right">
            <p className="text-xs text-muted-foreground">Player 2</p>
            <p className="mt-1 break-words font-semibold">{player2Name}</p>
          </div>
        </div>
        {scheduledTime && (
          <p className="mt-3 border-t pt-3 text-center text-xs text-muted-foreground">
            {scheduledTime}
          </p>
        )}
      </div>

      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold">Match format</legend>
        <RadioGroup
          className="grid grid-cols-2 gap-3"
          disabled={isSaving} value={String(gameCount)}
          onValueChange={(value) => setGameCount(value === "3" ? 3 : 5)}
        >
          {([3, 5] as const).map((count) => (
            <Label
              key={count}
              htmlFor={`${id}-${count}`}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${gameCount === count ? "border-primary bg-primary/5 text-primary" : "bg-card hover:bg-muted"}`}
            >
              <RadioGroupItem value={String(count)} id={`${id}-${count}`} />
              <span className="font-medium">Best of {count}</span>
            </Label>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
          <h3 className="text-sm font-semibold">Game scores</h3>
          <span className="text-xs text-muted-foreground">
            {gameCount} games
          </span>
        </div>
        <div className="divide-y">
          {Array.from({ length: gameCount }, (_, index) => (
            <fieldset key={index} className="grid grid-cols-2 gap-3 p-4">
              <legend className="sr-only">Game {index + 1}</legend>
              <div
                aria-hidden="true"
                className="col-span-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Game {index + 1}
              </div>
              {[player1Name, player2Name].map((name, playerIndex) => (
                <div key={playerIndex} className="min-w-0 space-y-2">
                  <Label
                    className="block truncate text-xs text-muted-foreground"
                    htmlFor={`${id}-${index}-${playerIndex}`}
                  >
                    {name}
                  </Label>
                  <Input
                    id={`${id}-${index}-${playerIndex}`}
                    aria-label={`Game ${index + 1}, player ${playerIndex + 1}: ${name} score`}
                    disabled={isSaving} type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    placeholder="0"
                    className="h-11 bg-background/50 text-center text-lg font-semibold tabular-nums"
                    value={scores[index][playerIndex]}
                    onChange={(event) =>
                      setScores((current) =>
                        current.map((game, gameIndex) =>
                          gameIndex === index
                            ? game.map((score, slot) =>
                                slot === playerIndex
                                  ? event.target.value
                                  : score,
                              )
                            : game,
                        ),
                      )
                    }
                  />
                </div>
              ))}
            </fieldset>
          ))}
        </div>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-6 flex items-center justify-between gap-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Save the completed match result.
        </p>
        <Button
          type="button"
          disabled={isSaving}
          onClick={async () => {
            if (isSaving) return;
            setError(null);
            const selectedGames = scores.slice(0, gameCount);
            if (selectedGames.some(([p1, p2]) => (p1 === "") !== (p2 === ""))) {
              setError("Enter both scores for each game played.");
              return;
            }
            const games = selectedGames
              .map(([p1, p2], index) => ({
                gameNumber: index + 1,
                p1Score: p1,
                p2Score: p2,
              }))
              .filter((game) => game.p1Score !== "" && game.p2Score !== "")
              .map((game) => ({
                gameNumber: game.gameNumber,
                p1Score: Number(game.p1Score),
                p2Score: Number(game.p2Score),
              }));

            for (const game of games) {
              if (!Number.isInteger(game.p1Score) || !Number.isInteger(game.p2Score) ||
                  game.p1Score < 0 || game.p2Score < 0 ||
                  game.p1Score > 2147483647 || game.p2Score > 2147483647) {
                setError(`Game ${game.gameNumber}: enter nonnegative whole numbers within the supported range.`);
                return;
              }
              if (game.p1Score === game.p2Score || Math.max(game.p1Score, game.p2Score) < 11) {
                setError(`Game ${game.gameNumber}: there must be a winner with at least 11 points.`);
                return;
              }
            }
            if (games.length === 0) {
              setError("Enter scores for the games played.");
              return;
            }

            setIsSaving(true);
            try {
              await scoreMatch(matchId, { games, matchType: gameCount });
              if (onSuccess) await onSuccess();
              else onClose();
            } catch (error) {
              setError(error instanceof Error ? error.message : "Unable to save scores.");
            } finally {
              setIsSaving(false);
            }
          }}
        >
          {isSaving ? "Saving…" : "Save result"}
        </Button>
        {onClose && (
          <Button type="button" variant="outline" disabled={isSaving} onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </section>
  );
}

