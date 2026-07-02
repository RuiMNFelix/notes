namespace Notes.Api.Features.Notes.UpdateNote;
public static class UpdateNoteEndpoint
{
    public static void MapUpdateNote(this IEndpointRouteBuilder app)
    {
        app.MapPut("api/notes/update/{id}", UpdateNoteHandler.HandleAsync)
            .WithName("Update Note").WithTags("Notes").RequireAuthorization();
    }
}