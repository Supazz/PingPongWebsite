namespace PingPongBackend.Persons;

public class PublicPersonDTO
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required int Elo { get; set; }
}

public class AdminPersonDTO : PublicPersonDTO
{
    public required string Email { get; set; }
}



public class CreatePersonDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required int Elo { get; set; }

}
