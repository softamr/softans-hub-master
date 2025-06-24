
'use server';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import * as enDict from '@/dictionaries/en.json';
import * as arDict from '@/dictionaries/ar.json';

const pageContentCollection = 'pageContent';

export type HomePageData = typeof enDict.homepage;
export type FooterData = typeof enDict.footer;

export type HomePageContent = {
    en: { homepage: HomePageData };
    ar: { homepage: HomePageData };
};

export type FooterContent = {
    en: FooterData;
    ar: FooterData;
};

export async function getHomePageContent(): Promise<HomePageContent> {
    const defaults: HomePageContent = {
        en: { homepage: enDict.homepage },
        ar: { homepage: arDict.homepage },
    };

    try {
        const docRef = doc(db, pageContentCollection, 'homepage');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            // A simple merge to prevent errors if the structure is out of sync
            return {
                en: { homepage: {...defaults.en.homepage, ...firestoreData.en?.homepage} },
                ar: { homepage: {...defaults.ar.homepage, ...firestoreData.ar?.homepage} }
            } as HomePageContent;
        } else {
            console.log("Homepage content not found in Firestore, returning default from dictionaries.");
            return defaults;
        }
    } catch (error) {
        console.error("Error getting homepage content, returning default from dictionaries:", error);
        return defaults;
    }
}

export async function updateHomePageContent(content: HomePageContent): Promise<void> {
    try {
        const docRef = doc(db, pageContentCollection, 'homepage');
        await setDoc(docRef, content, { merge: true });
    } catch (error) {
        console.error("Error updating homepage content:", error);
        throw error;
    }
}

export async function getFooterContent(): Promise<FooterContent> {
    const defaults: FooterContent = {
        en: enDict.footer,
        ar: arDict.footer,
    };

    try {
        const docRef = doc(db, pageContentCollection, 'footer');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            // A simple merge to prevent errors if the structure is out of sync
            return {
                en: {...defaults.en, ...firestoreData.en},
                ar: {...defaults.ar, ...firestoreData.ar}
            } as FooterContent;
        } else {
            console.log("Footer content not found in Firestore, returning default from dictionaries.");
            return defaults;
        }
    } catch (error) {
        console.error("Error getting footer content, returning default from dictionaries:", error);
        return defaults;
    }
}

export async function updateFooterContent(content: FooterContent): Promise<void> {
    try {
        const docRef = doc(db, pageContentCollection, 'footer');
        await setDoc(docRef, content, { merge: true });
    } catch (error) {
        console.error("Error updating footer content:", error);
        throw error;
    }
}
