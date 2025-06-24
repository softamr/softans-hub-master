
'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { getFooterContent, updateFooterContent, FooterContent, FooterData } from '@/lib/page-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FieldKey = keyof FooterData;

function SectionEditor({
  lang,
  sectionData,
  onUpdate,
}: {
  lang: 'en' | 'ar';
  sectionData: any;
  onUpdate: (lang: 'en' | 'ar', field: FieldKey, value: string) => void;
}) {
  
  if (typeof sectionData !== 'object' || sectionData === null) return null;

  return (
    <div className="space-y-4">
      {(Object.keys(sectionData) as Array<FieldKey>).map(field => (
        <div key={field} className="grid gap-2">
          <Label htmlFor={`${lang}-footer-${field}`} className="capitalize">{field}</Label>
          {field === 'description' ? (
             <Textarea
              id={`${lang}-footer-${field}`}
              value={sectionData[field]}
              onChange={(e) => onUpdate(lang, field, e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              id={`${lang}-footer-${field}`}
              value={sectionData[field]}
              onChange={(e) => onUpdate(lang, field, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}


export default function AdminFooterPage() {
  const [content, setContent] = React.useState<FooterContent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    async function loadContent() {
      try {
        const pageContent = await getFooterContent();
        setContent(pageContent);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load footer content.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, [toast]);

  const handleUpdate = (lang: 'en' | 'ar', field: FieldKey, value: string) => {
    setContent(prev => {
      if (!prev) return null;
      // Deep copy to avoid mutation issues
      const newContent = JSON.parse(JSON.stringify(prev));
      newContent[lang][field] = value;
      return newContent;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      await updateFooterContent(content);
      toast({
        title: 'Success',
        description: 'Footer content updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save content.',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderContentForm = (lang: 'en' | 'ar') => {
    if (!content) return null;
    
    return (
        <SectionEditor
            lang={lang}
            sectionData={content[lang]}
            onUpdate={handleUpdate}
        />
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>Manage Footer Content</CardTitle>
                <CardDescription>Edit the content for the website footer.</CardDescription>
            </div>
            <Button onClick={handleSave} disabled={isSaving || isLoading}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Tabs defaultValue="en">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ar">Arabic</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="pt-6">
                    {renderContentForm('en')}
                </TabsContent>
                <TabsContent value="ar" className="pt-6">
                    {renderContentForm('ar')}
                </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
