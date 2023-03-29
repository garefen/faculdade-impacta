import Head from 'next/head'
import styles from '@/styles/Products.module.css'
import {getProducts, addProduct} from '@/firebase/products'

import React, { FC, useState, useEffect } from "react";
import { parse } from 'path';

interface Props {
   products: any;
}


const Home: FC<Props>  = ({ products }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addProduct(name, parseFloat(price), parseInt(amount));
    setName("");
    setPrice("");
    setAmount("");
  }

  return (
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
                <td className={styles.productLine}>Preço: {product.price}</td>
                <td className={styles.productLine}>Quantidade: {product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {products},
  }
}

export default Home;