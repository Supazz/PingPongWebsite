using Microsoft.AspNetCore.Identity;
using PingPongBackend.Db;
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://pingpong.zacharypursell.us")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<PingPongDbContext>();
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<PingPongDbContext>().AddDefaultTokenProviders();
builder.Services.AddAuthorization();




var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<PingPongDbContext>();

    db.Database.Migrate();
}
if (app.Environment.IsDevelopment() &&
    app.Configuration.GetValue<bool>("BootstrapAdmin:Enabled"))
{
    using var scope = app.Services.CreateScope();

    var roleManager =
        scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var userManager =
        scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    var username = app.Configuration["BootstrapAdmin:Username"];
    var password = app.Configuration["BootstrapAdmin:Password"];

    if (string.IsNullOrWhiteSpace(username) ||
        string.IsNullOrWhiteSpace(password))
    {
        throw new InvalidOperationException(
            "Admin setup requires a username and password.");
    }

    void CheckResult(IdentityResult result)
    {
        if (!result.Succeeded)
        {
            throw new InvalidOperationException(string.Join(
                "; ", result.Errors.Select(error => error.Description)));
        }
    }

    const string adminRole = "Admin";

    if (!await roleManager.RoleExistsAsync(adminRole))
    {
        CheckResult(await roleManager.CreateAsync(
            new IdentityRole(adminRole)));
    }

    var user = await userManager.FindByNameAsync(username);

    if (user is null)
    {
        user = new IdentityUser { UserName = username };

        CheckResult(await userManager.CreateAsync(user, password));
    }
    else if (!await userManager.CheckPasswordAsync(user, password))
    {
        throw new InvalidOperationException(
            "An account with this username exists, but its password does not match.");
    }

    if (!await userManager.IsInRoleAsync(user, adminRole))
    {
        CheckResult(await userManager.AddToRoleAsync(user, adminRole));
    }

    app.Logger.LogInformation("Admin setup completed.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();

}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
