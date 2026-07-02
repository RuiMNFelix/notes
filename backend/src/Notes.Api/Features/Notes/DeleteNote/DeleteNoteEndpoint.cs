namespace Notes.Api.Features.Notes.DeleteNote;
public static class DeleteNoteEndpoint
{
    public static void MapDeleteNote(this IEndpointRouteBuilder app)
    {
        app.MapDelete("/notes/{id:int}", DeleteNoteHandler.HandleAsync)
            .WithName("DeleteNote").WithTags("Notes").RequireAuthorization();
    }
}