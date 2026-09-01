namespace PingPongBackend.Persons;



public class CreatePersonDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required int Elo { get; set; }

}
