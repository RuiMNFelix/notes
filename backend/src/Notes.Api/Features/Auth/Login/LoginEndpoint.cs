namespace Notes.Api.Features.Auth.Login;
public static class LoginEndpoint
{
    public static void MapLogin(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/login", LoginHandler.HandleAsync)
            .WithName("Login").WithTags("Auth");
    }
}