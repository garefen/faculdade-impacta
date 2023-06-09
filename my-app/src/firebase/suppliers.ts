import {db} from "./clientApp";
import {collection, query, getDocs, setDoc, doc, updateDoc} from "firebase/firestore";

export function addSupplier(name: string, address: string, phone: string, cnpj: string) {
  const data = {
    name,
    address,
    phone,
    cnpj,
 };
 setDoc(doc(db, "suppliers", makeId(10).toString()), data);

 return data;
}

export async function getSuppliers() {
  const suppliers: any = [];
  const q = query(collection(db, "suppliers"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    let data = doc.data();
    data = {id, ...data}
    suppliers.push(data);
  });

  return suppliers;
}

export async function getSingleSupplier(supplierId: string) {
  const products: any = [];
  const q = query(collection(db, "suppliers"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    if (id === supplierId) {
      let data = doc.data();
      data = {id, ...data}
      products.push(data);
    }
  });

  return products[0];
}

export async function updateSupplier(supplier: any) {
  const supplierRef = doc(db, "suppliers", supplier.id);
  await updateDoc(supplierRef, {
    name: supplier.name,
    address: supplier.address,
    phone: supplier.phone,
    cnpj: supplier.cnpj,
  });
}

function makeId(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

