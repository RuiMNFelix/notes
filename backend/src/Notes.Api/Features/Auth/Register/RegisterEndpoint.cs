namespace Notes.Api.Features.Auth.Register;
public  static class RegisterEndpoint
{
    public static void MapRegister(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/register", RegisterHandler.HandleAsync)
            .WithName("Register").WithTags("Auth");
    }
}