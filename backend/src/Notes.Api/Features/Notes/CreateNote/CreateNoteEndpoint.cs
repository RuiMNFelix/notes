namespace Notes.Api.Features.Notes.CreateNote;
public static class CreateNoteEndpoint
{
    public static void MapCreateNote(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/notes", CreateNoteHandler.HandleAsync)
            .WithName("Create Note").WithTags("Notes").RequireAuthorization();
    }
}