using FluentValidation;

namespace Notes.Api.Common.Extensions;
public static class ValidationExtension
{
    public static async Task<IResult?> ValidateRequest<T>(
        this IValidator<T> validator,
        T request)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }

        return null;
    }
}