using Notes.Api.Data;
using System.Security.Claims;
using Notes.Api.Common.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Notes.Api.Features.Notes.GetNotes;  
public static class GetNotesHandler
{
    public static async Task<IResult> HandleAsync(

        AppDbContext context,
        ClaimsPrincipal user)
    {
        var books = await context.Notes
            .Where(n => n.OwnerId == user.GetUserId())
            .Select(n => new GetNoteResponse(
                n.Id,
                n.Title,
                n.Content,
                n.CreatedAt,
                n.UpdatedAt
            ))
            .ToListAsync();

        return Results.Ok(books);
    }
}