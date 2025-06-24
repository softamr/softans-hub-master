
'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { getHomePageContent, updateHomePageContent, HomePageContent, HomePageData } from '@/lib/page-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type SectionKey = keyof HomePageData;

function SectionEditor({
  lang,
  sectionKey,
  sectionData,
  onUpdate,
}: {
  lang: 'en' | 'ar';
  sectionKey: SectionKey;
  sectionData: any;
  onUpdate: (lang: 'en' | 'ar', section: SectionKey, field: string, value: string) => void;
}) {
  const title = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
  
  if (typeof sectionData !== 'object' || sectionData === null) return null;

  return (
    <div className="space-y-4">
      {Object.entries(sectionData).map(([field, value]) => (
        <div key={field} className="grid gap-2">
          <Label htmlFor={`${lang}-${sectionKey}-${field}`}>{title} {field}</Label>
          {field.includes('description') || field.includes('subtitle') ? (
             <Textarea
              id={`${lang}-${sectionKey}-${field}`}
              value={value as string}
              onChange={(e) => onUpdate(lang, sectionKey, field, e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              id={`${lang}-${sectionKey}-${field}`}
              value={value as string}
              onChange={(e) => onUpdate(lang, sectionKey, field, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}


export default function AdminPagesPage() {
  const [content, setContent] = React.useState<HomePageContent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    async function loadContent() {
      try {
        const pageContent = await getHomePageContent();
        setContent(pageContent);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load page content.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, [toast]);

  const handleUpdate = (lang: 'en' | 'ar', section: SectionKey, field: string, value: string) => {
    setContent(prev => {
      if (!prev) return null;
      // Deep copy to avoid mutation issues
      const newContent = JSON.parse(JSON.stringify(prev));
      newContent[lang].homepage[section][field] = value;
      return newContent;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      await updateHomePageContent(content);
      toast({
        title: 'Success',
        description: 'Homepage content updated successfully.',
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
    
    const homepageContent = content[lang].homepage;
    
    return (
        <Accordion type="multiple" defaultValue={['hero']} className="w-full">
            {(Object.keys(homepageContent) as Array<SectionKey>).map(sectionKey => (
                <AccordionItem value={sectionKey} key={sectionKey}>
                    <AccordionTrigger className="capitalize">{sectionKey} Section</AccordionTrigger>
                    <AccordionContent>
                        <SectionEditor
                            lang={lang}
                            sectionKey={sectionKey}
                            sectionData={homepageContent[sectionKey]}
                            onUpdate={handleUpdate}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>Manage Homepage Content</CardTitle>
                <CardDescription>Edit the content for the main landing page.</CardDescription>
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
                <TabsContent value="en" className="pt-4">
                    {renderContentForm('en')}
                </TabsContent>
                <TabsContent value="ar" className="pt-4">
                    {renderContentForm('ar')}
                </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
