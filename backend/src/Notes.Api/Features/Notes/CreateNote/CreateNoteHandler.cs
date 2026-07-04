using Notes.Api.Data;
using System.Security.Claims;
using Notes.Api.Common.Extensions;
using FluentValidation;
using Notes.Api.Features.Notes;

namespace Notes.Api.Features.Notes.CreateNote;
public static class CreateNoteHandler
{
    public static async Task<IResult> HandleAsync(
        CreateNoteRequest request, 
        AppDbContext context,
        ClaimsPrincipal user,
        IValidator<CreateNoteRequest> validator,
        NoteService noteService)
    {
        var validationResult = await validator.ValidateRequest(request);
        if(validationResult is not null) { return validationResult; }

        var ownerId = user.GetUserId();

        if (await noteService.TitleExistsForOwnerAsync(ownerId, request.Title))
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

        return Results.Created($"/api/notes/{newNote.Id}", "Note created successfully!");
    }
}