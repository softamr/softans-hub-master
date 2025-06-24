import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';

export type Service = {
  id: string;
  slug: string;
  title: string;
  image: string;
  hint: string;
  description: string;
  features: string[];
  projects?: Project[];
};

export type Project = {
    title: string;
    description: string;
    image: string;
    hint: string;
    category: string;
}

const servicesCollection = collection(db, 'services');

export async function getAllServices(): Promise<Service[]> {
  try {
    const q = query(servicesCollection, orderBy('title'));
    const servicesSnapshot = await getDocs(q);
    if (servicesSnapshot.empty) {
      console.log('No services found in Firestore.');
      return [];
    }
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
    return servicesList;
  } catch (error) {
    console.error("Error fetching services: ", error);
    return []; // Return empty array on error
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    try {
        const q = query(servicesCollection, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log(`No service found with slug: ${slug}`);
            return null;
        }
        const serviceDoc = querySnapshot.docs[0];
        return { id: serviceDoc.id, ...serviceDoc.data() } as Service;
    } catch (error) {
        console.error(`Error fetching service with slug ${slug}: `, error);
        return null;
    }
}
