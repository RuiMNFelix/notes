using System.Security.Claims;

namespace Notes.Api.Common.Extensions;
public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        var claim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (claim is null || !int.TryParse(claim, out var userId))
            throw new UnauthorizedAccessException("User is not authenticated.");

        return userId;
    }
}