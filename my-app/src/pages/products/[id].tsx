import Head from 'next/head'
import styles from '@/styles/Products.module.css'
import {getProducts, addProduct, getSingleProduct, updateProduct} from '@/firebase/products'
import {useRouter} from 'next/router'


import React, { FC, useState } from "react";

interface Props {
  product: any;
}

const Update: FC<Props>  = ({product}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [amount, setAmount] = useState(product.amount);
  const router = useRouter()

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    updateProduct({
      id: product.id,
      name,
      price,
      amount,
    });
    alert('Produto alterado com sucesso');
    router.push('/products');
  }

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.updateHeadline}>
          Atualizar produto
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
    </>
  )
}

export const getStaticProps = async ({params}) => {
  const data = await getSingleProduct(params.id);
  return {
    props: {
      product: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getProducts();
  const paths = data.map((post: { id: string }) => ({ params: { id: post.id } }));
  return {
    paths,
    fallback: true,
  };
};


export default Update;
