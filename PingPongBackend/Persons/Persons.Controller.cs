using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PingPongBackend.Db;

namespace PingPongBackend.Persons;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly PingPongDbContext _db;
    public PersonsController(PingPongDbContext db)
    {
        _db = db;
    }

    [HttpGet]

    public async Task<ActionResult<List<Person>>> GetPersons()
    {
        return await _db.Persons.ToListAsync();
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
}
