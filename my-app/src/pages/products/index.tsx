import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Products.module.css'
import {getProducts, addProduct} from '@/firebase/products'

import React, { FC, useState } from "react";

interface Props {
   products: any;
}

const Products: FC<Props>  = ({ products }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const newPrice = parseFloat(price);
    const newAmount = parseInt(amount)
    const newProduct = {
      name, 
      price: newPrice,
      amount: newAmount,
    }
    addProduct(newProduct.name, newProduct.price, newProduct.amount);
    products.push(newProduct);
    setName("");
    setPrice("");
    setAmount("");
  }

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.create}>
          <div className={styles.headline}>
            Cadastrar Produto:
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.formItem}>
                <label htmlFor="name" className={styles.label}>Nome: </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="price" className={styles.label}>Valor: </label>
                <input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="amount" className={styles.label}>Quantidade: </label>
                <input
                  value={amount}
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  className={styles.input}
                  type="number"
                />
              </div>
              <button className={styles.submit} type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.headline}>
            Lista de Produtos:
          </div>
          <table className={styles.productTable}>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className={styles.product}>
                  <td className={styles.productLine}>Nome: {product.name}</td>
                  <td className={styles.productLine}>Preço: R${product.price.toFixed(2).replace('.', ',')}</td>
                  <td className={styles.productLine}>Quantidade: {product.amount}</td>
                  <td><Link href={`/products/${product.id}`}>update</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { products },
  };
}

export default Products;
