public static class ProtectedEndpoints
{
    public static void MapProtectedEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/authenticated-only", () => Results.Ok("You are authenticated!"))
            .RequireAuthorization().WithName("AuthenticatedOnly").WithTags("Auth");;
    }
}