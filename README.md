# notes

notes-app/
├── docker-compose.yml
├── README.md
│
├── backend/
│   ├── Notes.sln
│   │
│   ├── src/
│   │   └── Notes.Api/
│   │       ├── Notes.Api.csproj
│   │       ├── Program.cs
│   │       │
│   │       ├── Features/
│   │       │   ├── Notes/
│   │       │   │   ├── CreateNote/
│   │       │   │   │   ├── CreateNoteEndpoint.cs
│   │       │   │   │   ├── CreateNoteRequest.cs
│   │       │   │   │   ├── CreateNoteHandler.cs
│   │       │   │   │   └── CreateNoteValidator.cs
│   │       │   │   ├── GetNotes/
│   │       │   │   ├── UpdateNote/
│   │       │   │   └── DeleteNote/
│   │       │   │
│   │       │   └── Auth/
│   │       │       ├── Register/
│   │       │       └── Login/
│   │       │
│   │       ├── Entities/
│   │       │   ├── Note.cs
│   │       │   └── User.cs
│   │       │
│   │       ├── Data/
│   │       │   ├── AppDbContext.cs
│   │       │   └── Migrations/
│   │       │
│   │       └── Common/
│   │           ├── Middleware/
│   │           └── Extensions/
│   │
│   └── tests/
│       └── Notes.Api.Tests/
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   │
    │   ├── features/
    │   │   ├── notes/
    │   │   │   ├── NotesList.tsx
    │   │   │   ├── NoteEditor.tsx
    │   │   │   └── api.ts
    │   │   └── auth/
    │   │       ├── Login.tsx
    │   │       └── Register.tsx
    │   │
    │   └── shared/
    │       ├── api/
    │       │   └── client.ts
    │       └── components/
    └── public/