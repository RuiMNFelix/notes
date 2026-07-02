using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Notes.Api.Common.Extensions;
using Notes.Api.Data;

namespace Notes.Api.Features.Notes.DeleteNote;
public static class DeleteNoteHandler
{
    public static async Task<IResult> HandleAsync(
        int id,
        AppDbContext context,
        ClaimsPrincipal user
    )
    {
        var ownerId = user.GetUserId();

        var note = await context.Notes
            .FirstOrDefaultAsync(n => n.Id == id && n.OwnerId == ownerId);
        if (note == null) { return Results.NotFound("Note not found."); }

        context.Notes.Remove(note);
        await context.SaveChangesAsync();

        return Results.NoContent();
    }
}