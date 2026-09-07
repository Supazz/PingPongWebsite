using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PingPongBackend.Db;
using PingPongBackend.Persons;

namespace PingPongBackend.Matches;

[ApiController]
[Route("api/[controller]")]


public class MatchesController : ControllerBase
{
    private readonly PingPongDbContext _db;
    public MatchesController(PingPongDbContext db)
    {
        _db = db;
    }

    [HttpGet]

    public async Task<ActionResult<List<Match>>> GetMatches()
    {
        return await _db.Matches.ToListAsync();
    }
    [HttpPost]

    public async Task<ActionResult<Match>> CreateMatch(CreateMatchDTO match)
    {
        var NewMatch = new Match
        {
            Id = Guid.NewGuid(),
            P1 = match.P1,
            P2 = match.P2,
            MatchTime = match.MatchTime,
            MatchType = match.Matchtype
        };
        _db.Matches.Add(NewMatch);
        await _db.SaveChangesAsync();
        return Ok(NewMatch);

    }
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Match>> DeleteMatch(Guid id)
    {
        var match = await _db.Matches.FindAsync(id);
        if (match is null)
        {
            return NotFound();
        }
        _db.Matches.Remove(match);
        await _db.SaveChangesAsync();
        return NoContent();
    }


    // Each request contains the complete result, including score corrections.
    [HttpPatch("{matchId:guid}/result")]
    public async Task<IActionResult> ScoreMatch(
        [FromRoute] Guid matchId,
        [FromBody] ScoreMatchDTO scoreMatchDTO)
    {
        var match = await _db.Matches
            .Include(m => m.Games)
            .FirstOrDefaultAsync(m => m.Id == matchId);

        if (match is null)
            return NotFound("Match not found.");

        if (scoreMatchDTO is null)
            return BadRequest("A match format and game scores are required.");

        if (scoreMatchDTO.MatchType != MatchType.ThreeGames &&
            scoreMatchDTO.MatchType != MatchType.FiveGames)
            return BadRequest("Match type must be 3 or 5.");

        int maximumGames = (int)scoreMatchDTO.MatchType;
        int winsNeeded = maximumGames / 2 + 1;

        var games = scoreMatchDTO.Games;
        if (games is null || games.Count < winsNeeded || games.Count > maximumGames)
            return BadRequest($"Submit between {winsNeeded} and {maximumGames} games for a completed match.");

        if (games.Any(game => game is null))
            return BadRequest("Game entries cannot be null.");

        var submittedGames = games.OrderBy(game => game.GameNumber).ToList();
        int player1Wins = 0;
        int player2Wins = 0;

        // Validate everything before changing any tracked database entities.
        for (int index = 0; index < submittedGames.Count; index++)
        {
            var game = submittedGames[index];
            if (game.GameNumber != index + 1)
                return BadRequest("Game numbers must start at 1 with no gaps or duplicates.");

            if (player1Wins == winsNeeded || player2Wins == winsNeeded)
                return BadRequest("Games cannot be played after the match has already been won.");

            if (game.P1Score < 0 || game.P2Score < 0)
                return BadRequest($"Game {game.GameNumber}: scores cannot be negative.");

            if (game.P1Score == game.P2Score)
                return BadRequest($"Game {game.GameNumber}: a completed game cannot end in a tie.");

            if (Math.Max(game.P1Score, game.P2Score) < 11)
                return BadRequest($"Game {game.GameNumber}: the winning score must be at least 11.");

            if (game.P1Score > game.P2Score)
                player1Wins++;
            else
                player2Wins++;
        }

        if (player1Wins != winsNeeded && player2Wins != winsNeeded)
            return BadRequest($"The match is incomplete: a player must win {winsNeeded} games.");

        // Keep existing row IDs when correcting scores. Remove games omitted
        // from a shorter corrected result, as well as any legacy duplicates.
        var previousGames = match.Games.ToList();
        foreach (var submitted in submittedGames)
        {
            var game = previousGames.FirstOrDefault(g => g.GameNumber == submitted.GameNumber);
            if (game is null)
            {
                game = new MatchGame
                {
                    Id = Guid.NewGuid(),
                    MatchId = match.Id,
                    Match = match,
                    GameNumber = submitted.GameNumber,
                    P1Score = submitted.P1Score,
                    P2Score = submitted.P2Score
                };
                // This is a new row even though its GUID is already assigned.
                _db.MatchGames.Add(game);
            }
            else
            {
                game.P1Score = submitted.P1Score;
                game.P2Score = submitted.P2Score;
                previousGames.Remove(game);
            }
        }

        _db.MatchGames.RemoveRange(previousGames);
        match.MatchType = scoreMatchDTO.MatchType;
        match.Winner = player1Wins == winsNeeded ? Winner.P1 : Winner.P2;
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
