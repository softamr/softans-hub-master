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
import { Textarea } from '@/components/ui/textarea';
import { Edit, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// In a real app, this data would come from a database or CMS
// This is now just a type definition
type Service = {
  id: string; // Firestore document ID
  slug: string;
  title: string;
  image: string;
  hint: string;
  description: string;
  features: string[];
};

const emptyService: Omit<Service, 'id'> = {
  slug: '',
  title: '',
  image: 'https://placehold.co/1200x675.png',
  hint: '',
  description: '',
  features: [],
};

function ServiceFormDialog({
  service,
  isOpen,
  onOpenChange,
  onSave,
}: {
  service: Partial<Service> | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (service: Service) => void;
}) {
  const [editedService, setEditedService] = React.useState(service);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedService) return;

    setIsSaving(true);
    try {
      const { id, ...dataToSave } = editedService;

      if (id) {
        // Update existing service
        const serviceRef = doc(db, 'services', id);
        await updateDoc(serviceRef, dataToSave);
        onSave(editedService as Service);
        toast({ title: 'Success', description: 'Service updated successfully.' });
      } else {
        // Create new service
        const servicesCollection = collection(db, 'services');
        const docRef = await addDoc(servicesCollection, dataToSave);
        onSave({ id: docRef.id, ...dataToSave } as Service);
        toast({ title: 'Success', description: 'Service created successfully.' });
      }
    } catch (error) {
      console.error('Error saving document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save service.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const dialogTitle = service?.id ? `Edit: ${service.title}` : 'Create New Service';

  if (!editedService) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedService.title || ''}
                onChange={(e) =>
                  setEditedService({ ...editedService, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                value={editedService.slug || ''}
                onChange={(e) =>
                  setEditedService({ ...editedService, slug: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={editedService.image || ''}
                onChange={(e) =>
                  setEditedService({ ...editedService, image: e.target.value })
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
                value={editedService.hint || ''}
                onChange={(e) =>
                  setEditedService({ ...editedService, hint: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="pt-2 text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editedService.description || ''}
                onChange={(e) =>
                  setEditedService({
                    ...editedService,
                    description: e.target.value,
                  })
                }
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="features" className="pt-2 text-right">
                Features
              </Label>
              <Textarea
                id="features"
                value={editedService.features?.join('\n') || ''}
                onChange={(e) =>
                  setEditedService({
                    ...editedService,
                    features: e.target.value.split('\n').filter((f) => f.trim() !== ''),
                  })
                }
                className="col-span-3 min-h-[100px]"
                placeholder="Enter one feature per line"
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

export default function AdminServicesPage() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedService, setSelectedService] =
    React.useState<Partial<Service> | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(
    null
  );
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services');
        const q = query(servicesCollection, orderBy('title'));
        const servicesSnapshot = await getDocs(q);
        const servicesList = servicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[];
        setServices(servicesList);
      } catch (error) {
        console.error('Error fetching services: ', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch services.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [toast]);

  const handleCreateClick = () => {
    setSelectedService(emptyService);
    setIsFormOpen(true);
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteDoc(doc(db, 'services', serviceToDelete.id));
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
      toast({ title: 'Success', description: 'Service deleted successfully.' });
    } catch (error) {
      console.error('Error deleting service: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete service.',
      });
    } finally {
      setServiceToDelete(null);
    }
  };

  const handleSave = (savedService: Service) => {
    const serviceExists = services.some((s) => s.id === savedService.id);
    if (serviceExists) {
      setServices((prev) =>
        prev.map((s) => (s.id === savedService.id ? savedService : s))
      );
    } else {
      setServices((prev) =>
        [...prev, savedService].sort((a, b) => a.title.localeCompare(b.title))
      );
    }
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setIsFormOpen(isOpen);
    if (!isOpen) {
      setSelectedService(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Services</CardTitle>
            <CardDescription>
              Create, edit, and delete your services.
            </CardDescription>
          </div>
          <Button onClick={handleCreateClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Service
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
                  <TableHead>Service Title</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {service.title}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(service)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(service)}
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
        <ServiceFormDialog
          key={selectedService?.id || 'new'}
          service={selectedService}
          isOpen={isFormOpen}
          onOpenChange={handleDialogChange}
          onSave={handleSave}
        />
      )}

      <AlertDialog
        open={!!serviceToDelete}
        onOpenChange={() => setServiceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "
              {serviceToDelete?.title}" service.
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
