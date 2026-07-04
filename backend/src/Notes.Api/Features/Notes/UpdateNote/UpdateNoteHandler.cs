using Notes.Api.Data;
using System.Security.Claims;
using FluentValidation;
using Notes.Api.Common.Extensions;
using Notes.Api.Features.Notes;

namespace Notes.Api.Features.Notes.UpdateNote;
public static class UpdateNoteHandler
{
    public static async Task<IResult> HandleAsync(
        int id,
        UpdateNoteRequest request, 
        AppDbContext context,
        ClaimsPrincipal user,
        IValidator<UpdateNoteRequest> validator,
        NoteService noteService)
    {
        var validationResult = await validator.ValidateRequest(request);
        if (validationResult is not null) { return validationResult; }

        var ownerId = user.GetUserId();

        var note = await noteService.GetOwnedNoteAsync(id, ownerId);
        if (note == null) { return Results.NotFound("Note not found."); }

        if (await noteService.TitleExistsForOwnerAsync(ownerId, request.Title, id))
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