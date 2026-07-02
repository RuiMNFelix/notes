using FluentValidation;

namespace Notes.Api.Features.Notes.UpdateNote;

public class UpdateNoteRequestValidator : AbstractValidator<UpdateNoteRequest>
{
    public UpdateNoteRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title is required.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Content is required.");
    }
}