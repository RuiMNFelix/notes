import { NotebookPen, LogOut } from "lucide-react";
import { CreateNoteDialog } from "@/features/notes/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { clearToken } from "@/shared/lib/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-6 w-6" />
          <h1 className="text-xl font-bold">Notes</h1>
        </div>

        <div className="flex items-center gap-2">
          <CreateNoteDialog />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}