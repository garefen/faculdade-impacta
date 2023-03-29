import {db} from "./clientApp";
import {collection, query, getDocs, setDoc, doc} from "firebase/firestore";

export function addProduct(name: string, price: number, amount: number) {
  const data = {
    name,
    price,
    amount,
 };
 setDoc(doc(db, "products", makeId(10).toString()), data);
}

export async function getProducts() {
  const products: any = [];
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    let data = doc.data();
    data = {id, ...data}
    products.push(data);
  });

  return products;
}

function makeId(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
  result += characters.charAt(Math.floor(Math.random() * 
                                    charactersLength));
  }
  return result;
}

