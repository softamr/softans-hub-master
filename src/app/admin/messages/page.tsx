
'use client';

import * as React from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
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
  DialogDescription,
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
import { Eye, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type Message = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  submittedAt: Timestamp;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const [messageToDelete, setMessageToDelete] = React.useState<Message | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, 'messages');
        const q = query(messagesCollection, orderBy('submittedAt', 'desc'));
        const messagesSnapshot = await getDocs(q);
        const messagesList = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(messagesList);
      } catch (error) {
        console.error('Error fetching messages: ', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch messages.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [toast]);

  const handleDeleteClick = (message: Message) => {
    setMessageToDelete(message);
  };
  
  const handleViewClick = (message: Message) => {
    setSelectedMessage(message);
  }

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    try {
      await deleteDoc(doc(db, 'messages', messageToDelete.id));
      setMessages((prev) => prev.filter((m) => m.id !== messageToDelete.id));
      toast({ title: 'Success', description: 'Message deleted successfully.' });
    } catch (error) {
      console.error('Error deleting message: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete message.',
      });
    } finally {
      setMessageToDelete(null);
    }
  };
  
  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), "MMM d, yyyy 'at' h:mm a");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Messages</CardTitle>
          <CardDescription>
            View and manage messages submitted through your website.
          </CardDescription>
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
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Service of Interest</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No messages found.
                        </TableCell>
                    </TableRow>
                ) : (
                    messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>{formatDate(message.submittedAt)}</TableCell>
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.service}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewClick(message)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteClick(message)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
                <DialogDescription>
                    {selectedMessage?.email} | {formatDate(selectedMessage?.submittedAt || null)}
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div>
                    <h4 className="font-semibold">Service of Interest</h4>
                    <p className="text-muted-foreground">{selectedMessage?.service}</p>
                </div>
                <div>
                    <h4 className="font-semibold">Message</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedMessage?.message}</p>
                </div>
            </div>
        </DialogContent>
    </Dialog>


      <AlertDialog
        open={!!messageToDelete}
        onOpenChange={() => setMessageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              message from "{messageToDelete?.name}".
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
