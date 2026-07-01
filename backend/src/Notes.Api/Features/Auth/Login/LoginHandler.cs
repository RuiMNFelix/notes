using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Notes.Api.Data;
using Notes.Api.Entities;
using Notes.Api.Common.Auth;
using FluentValidation;

namespace Notes.Api.Features.Auth.Login;

public static class LoginHandler
{
    public static async Task<IResult> HandleAsync (
        LoginRequest request, 
        AppDbContext context, 
        ITokenService tokenService,
        IValidator<LoginRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var user = await context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user == null) { return Results.BadRequest("Invalid credentials!"); }
        if (new PasswordHasher<User>()
            .VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
        {
            return Results.BadRequest("Invalid credentials!");
        }
        var token = tokenService.GenerateToken(user);

        return Results.Ok(new { token });
    }
}