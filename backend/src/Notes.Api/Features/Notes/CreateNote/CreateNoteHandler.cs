using Notes.Api.Data;
using FluentValidation;
using System.Security.Claims;
using Notes.Api.Common.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Notes.Api.Features.Notes.CreateNote;
public static class CreateNoteHandler
{
    public static async Task<IResult> HandleAsync(
        CreateNoteRequest request, 
        AppDbContext context,
        ClaimsPrincipal user,
        IValidator<CreateNoteRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var ownerId = user.GetUserId();

        if (await context.Notes.AnyAsync(n => n.Title == request.Title && n.OwnerId == ownerId))
        {
            return Results.BadRequest("Already exists a Note with this Title.");
        }

        var newNote = new Note
        {
            OwnerId = ownerId,
            Title = request.Title,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Notes.Add(newNote);
        await context.SaveChangesAsync();

        return Results.Created($"/api/notes/{newNote.Id}", new { message = "Note created successfully!" });
    }
}