import {db} from "./clientApp";
import {collection, query, getDocs, setDoc, doc, updateDoc} from "firebase/firestore";

export function addSupplier(name: string, address: string, phone: string, cnpj: string) {
  const data = {
    name,
    address,
    phone,
    cnpj
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

export async function updateSupplier(product: any) {
  const productRef = doc(db, "suppliers", product.id);
  await updateDoc(productRef, {
    name: product.name,
    price: Number(product.price),
    amount: product.amount,
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

