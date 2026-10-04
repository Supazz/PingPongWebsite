using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PingPongBackend.Db;

namespace PingPongBackend.Persons;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class PersonsController : ControllerBase
{
    private readonly PingPongDbContext _db;
    public PersonsController(PingPongDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [AllowAnonymous]

    public async Task<ActionResult<List<PublicPersonDTO>>> GetPersons()
    {
        return await _db.Persons.AsNoTracking()
            .Select(person => new PublicPersonDTO
            {
                Id = person.Id,
                Name = person.Name,
                Elo = person.Elo
            })
            .ToListAsync();
    }

    [HttpGet("admin")]
    public async Task<ActionResult<List<AdminPersonDTO>>> GetAdminPersons()
    {
        // Inherits the controller's Admin authorization requirement.
        return await _db.Persons.AsNoTracking()
            .Select(person => new AdminPersonDTO
            {
                Id = person.Id,
                Name = person.Name,
                Email = person.Email,
                Elo = person.Elo
            })
            .ToListAsync();
    }

    [HttpPost]

    public async Task<ActionResult<Person>> CreatePerson(CreatePersonDTO person)
    {
        var NewPerson = new Person
        {
            Id = Guid.NewGuid(),
            Name = person.Name,
            Email = person.Email,
            Elo = person.Elo
        };

        _db.Persons.Add(NewPerson);

        await _db.SaveChangesAsync();
        return Ok(NewPerson);
    }
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Person>> DeletePerson(Guid id)
    {
        var person = await _db.Persons.FindAsync(id);
        if (person is null)
        {
            return NotFound();
        }
        _db.Persons.Remove(person);
        await _db.SaveChangesAsync();
        return NoContent();
    }

}
