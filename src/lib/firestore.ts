import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { firebaseConfig } from '@/lib/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
}

export const createUserProfile = async (uid: string, email: string) => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid,
      email,
      createdAt: serverTimestamp(),
    });
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const productsCollectionRef = collection(db, 'products');
  const q = query(productsCollectionRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });

  // If no products exist, add some dummy data for demonstration
  if (products.length === 0) {
    const dummyProducts = [
      {
        id: 'dummy-1',
        name: 'Vintage Camera',
        description: 'A beautiful vintage camera, perfect for collectors.',
        price: 120.00,
        imageUrl: 'https://picsum.photos/seed/vintage-camera/400/300',
        createdAt: serverTimestamp()
      },
      {
        id: 'dummy-2',
        name: 'Classic Vinyl Record',
        description: 'Rare vinyl record from the 70s. Great condition.',
        price: 25.50,
        imageUrl: 'https://picsum.photos/seed/vinyl-record/400/300',
        createdAt: serverTimestamp()
      },
      {
        id: 'dummy-3',
        name: 'Retro Gaming Console',
        description: 'Fully functional retro gaming console with classic games.',
        price: 80.00,
        imageUrl: 'https://picsum.photos/seed/gaming-console/400/300',
        createdAt: serverTimestamp()
      }
    ];

    for (const product of dummyProducts) {
      const productRef = doc(db, 'products', product.id);
      await setDoc(productRef, product);
    }
    return dummyProducts as Product[]; // Return dummy data after setting it
  }

  return products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const productRef = doc(db, 'products', id);
  const docSnap = await getDoc(productRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  } else {
    return null;
  }
}; 