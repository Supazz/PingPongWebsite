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
            MatchTime = match.MatchTime
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

}