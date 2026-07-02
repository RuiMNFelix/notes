namespace Notes.Api.Features.Notes.GetNotes;
public record GetNoteResponse(
    int Id,
    string Title,
    string Content,
    DateTime CreatedAt,
    DateTime UpdatedAt
);