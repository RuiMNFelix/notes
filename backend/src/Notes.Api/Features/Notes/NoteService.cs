using Notes.Api.Data;
using Notes.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Notes.Api.Common.Extensions;

namespace Notes.Api.Features.Notes;

public class NoteService
{
    private readonly AppDbContext _context;

    public NoteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> TitleExistsForOwnerAsync(int ownerId, string title, int? excludeId = null)
    {
        return await _context.Notes.AnyAsync(n =>
            n.Title == title &&
            n.OwnerId == ownerId &&
            (excludeId == null || n.Id != excludeId));
    }

    public async Task<Note?> GetOwnedNoteAsync(int id, int ownerId)
    {
        return await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.OwnerId == ownerId);
    }
}
