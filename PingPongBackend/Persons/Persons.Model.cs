namespace PingPongBackend.Persons;



public class Person
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required int Elo { get; set; }
}
