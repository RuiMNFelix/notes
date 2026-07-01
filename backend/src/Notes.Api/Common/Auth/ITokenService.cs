using Notes.Api.Entities;

namespace Notes.Api.Common.Auth;

public interface ITokenService
{
    string GenerateToken(User user);
}