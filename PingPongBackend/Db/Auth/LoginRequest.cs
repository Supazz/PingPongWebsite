using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.SignalR;

namespace PingPongBackend.Auth;

public class LoginRequest
{
    [Required]
    public string username {get; set;} = "";
    public string password {get; set;} = "";

    
}