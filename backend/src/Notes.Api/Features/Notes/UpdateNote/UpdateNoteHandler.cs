using Notes.Api.Data;
using System.Security.Claims;
using FluentValidation;
using Notes.Api.Common.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Notes.Api.Features.Notes.UpdateNote;
public static class UpdateNoteHandler
{
    public static async Task<IResult> HandleAsync(
        int id,
        UpdateNoteRequest request, 
        AppDbContext context,
        ClaimsPrincipal user,
        IValidator<UpdateNoteRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        var ownerId = user.GetUserId();

        var note = await context.Notes.FirstOrDefaultAsync(n =>
            n.Id == id &&
            n.OwnerId == ownerId);
        if (note == null) { return Results.NotFound("Note not found."); }

        if (await context.Notes.AnyAsync(n => n.Title == request.Title && n.OwnerId == ownerId && n.Id != id))
        {
            return Results.BadRequest("Already exists a Note with this Title.");
        }

        note.Title = request.Title;
        note.Content = request.Content;
        note.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        return Results.NoContent();
    }
}