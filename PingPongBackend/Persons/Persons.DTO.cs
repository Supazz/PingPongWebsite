namespace PingPongBackend.Persons;



public class CreatePersonDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public int Elo { get; set; }

}
