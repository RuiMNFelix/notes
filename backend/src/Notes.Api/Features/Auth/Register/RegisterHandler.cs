using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Notes.Api.Data;
using Notes.Api.Entities;
using FluentValidation;
using Notes.Api.Common.Extensions;

namespace Notes.Api.Features.Auth.Register;

public static class RegisterHandler
{
    public static async Task<IResult> HandleAsync(
        RegisterRequest request, 
        AppDbContext context,
        IValidator<RegisterRequest> validator)
    {
        var validationResult = await validator.ValidateRequest(request);
        if(validationResult is not null) { return validationResult; }

        if (await context.Users.AnyAsync(u => u.Username == request.Username))
        {
            return Results.BadRequest("Username already exists.");
        }
        var user = new User { Username = request.Username };
        user.PasswordHash = new PasswordHasher<User>()
            .HashPassword(user, request.Password);

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return Results.Ok("User registered successfully!");
    }
}