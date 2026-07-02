namespace Notes.Api.Features.Notes.GetNotes;
public static class GetNotesEndpoint
{
    public static void MapGetNotes(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/notes", GetNotesHandler.HandleAsync)
            .WithName("Get Notes").WithTags("Notes").RequireAuthorization();
    }
}