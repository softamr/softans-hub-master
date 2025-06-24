
'use client';

import * as React from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Industry } from '@/lib/industries';

const emptyIndustry: Omit<Industry, 'id'> = {
  name: '',
  image: 'https://placehold.co/400x500.png',
  hint: '',
  icon: '',
};

function IndustryFormDialog({
  industry,
  isOpen,
  onOpenChange,
  onSave,
}: {
  industry: Partial<Industry> | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (industry: Industry) => void;
}) {
  const [editedIndustry, setEditedIndustry] = React.useState(industry);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedIndustry) return;

    setIsSaving(true);
    try {
      const { id, ...dataToSave } = editedIndustry;

      if (id) {
        // Update existing industry
        const industryRef = doc(db, 'industries', id);
        await updateDoc(industryRef, dataToSave);
        onSave(editedIndustry as Industry);
        toast({ title: 'Success', description: 'Industry updated successfully.' });
      } else {
        // Create new industry
        const industriesCollection = collection(db, 'industries');
        const docRef = await addDoc(industriesCollection, dataToSave);
        onSave({ id: docRef.id, ...dataToSave } as Industry);
        toast({ title: 'Success', description: 'Industry created successfully.' });
      }
    } catch (error) {
      console.error('Error saving document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save industry.',
      });
    } finally {
      setIsSaving(false);
      onOpenChange(false);
    }
  };

  const dialogTitle = industry?.id ? `Edit: ${industry.name}` : 'Create New Industry';

  if (!editedIndustry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedIndustry.name || ''}
                onChange={(e) =>
                  setEditedIndustry({ ...editedIndustry, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon Name
              </Label>
              <Input
                id="icon"
                value={editedIndustry.icon || ''}
                onChange={(e) =>
                  setEditedIndustry({ ...editedIndustry, icon: e.target.value })
                }
                className="col-span-3"
                placeholder="e.g., UtensilsCrossed, Factory"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={editedIndustry.image || ''}
                onChange={(e) =>
                  setEditedIndustry({ ...editedIndustry, image: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">
                Image Hint
              </Label>
              <Input
                id="hint"
                value={editedIndustry.hint || ''}
                onChange={(e) =>
                  setEditedIndustry({ ...editedIndustry, hint: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = React.useState<Industry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedIndustry, setSelectedIndustry] =
    React.useState<Partial<Industry> | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [industryToDelete, setIndustryToDelete] = React.useState<Industry | null>(
    null
  );
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const industriesCollection = collection(db, 'industries');
        const q = query(industriesCollection, orderBy('name'));
        const industriesSnapshot = await getDocs(q);
        const industriesList = industriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Industry[];
        setIndustries(industriesList);
      } catch (error) {
        console.error('Error fetching industries: ', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch industries.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, [toast]);

  const handleCreateClick = () => {
    setSelectedIndustry(emptyIndustry);
    setIsFormOpen(true);
  };

  const handleEditClick = (industry: Industry) => {
    setSelectedIndustry(industry);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (industry: Industry) => {
    setIndustryToDelete(industry);
  };

  const confirmDelete = async () => {
    if (!industryToDelete) return;
    try {
      await deleteDoc(doc(db, 'industries', industryToDelete.id));
      setIndustries((prev) => prev.filter((s) => s.id !== industryToDelete.id));
      toast({ title: 'Success', description: 'Industry deleted successfully.' });
    } catch (error) {
      console.error('Error deleting industry: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete industry.',
      });
    } finally {
      setIndustryToDelete(null);
    }
  };

  const handleSave = (savedIndustry: Industry) => {
    const industryExists = industries.some((s) => s.id === savedIndustry.id);
    if (industryExists) {
      setIndustries((prev) =>
        prev.map((s) => (s.id === savedIndustry.id ? savedIndustry : s))
      );
    } else {
      setIndustries((prev) =>
        [...prev, savedIndustry].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    setIsFormOpen(false);
    setSelectedIndustry(null);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setIsFormOpen(isOpen);
    if (!isOpen) {
      setSelectedIndustry(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Industries</CardTitle>
            <CardDescription>
              Create, edit, and delete your served industries.
            </CardDescription>
          </div>
          <Button onClick={handleCreateClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Industry
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Industry Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {industries.map((industry) => (
                  <TableRow key={industry.id}>
                    <TableCell className="font-medium">
                      {industry.name}
                    </TableCell>
                    <TableCell>
                      {industry.icon}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(industry)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(industry)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {isFormOpen && (
        <IndustryFormDialog
          key={selectedIndustry?.id || 'new'}
          industry={selectedIndustry}
          isOpen={isFormOpen}
          onOpenChange={handleDialogChange}
          onSave={handleSave}
        />
      )}

      <AlertDialog
        open={!!industryToDelete}
        onOpenChange={() => setIndustryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "
              {industryToDelete?.name}" industry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
