import Head from 'next/head'
import styles from '@/styles/Products.module.css'
import {getSuppliers, addSupplier, getSingleSupplier, updateSupplier} from '@/firebase/suppliers'
import {useRouter} from 'next/router'


import React, { FC, useState } from "react";

interface Props {
  supplier: any;
}

const Update: FC<Props>  = ({supplier}) => {
  console.log(supplier)
  const [name, setName] = useState(supplier.name);
  const [address, setAddress] = useState(supplier.address);
  const [phone, setPhone] = useState(supplier.phone);
  const [cnpj, setCnpj] = useState(supplier.cnpj);
  const router = useRouter()

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    updateSupplier({
      id: supplier.id,
      name,
      address,
      phone,
      cnpj,
    }).then(() => {
      alert('Fornecedor alterado com sucesso');
      router.push('/suppliers');
    });
  }

  return (
    <>
      <Head>
        <title>Fornecedores</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.updateHeadline}>
          Atualizar fornecedor
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
              <label htmlFor="address" className={styles.label}>Endereço: </label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="phone" className={styles.label}>Telefone: </label>
              <input
                value={phone}
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="cnpj" className={styles.label}>CNPJ: </label>
              <input
                value={cnpj}
                id="cnpj"
                onChange={(e) => setCnpj(e.target.value)}
                className={styles.input}
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
  const data = await getSingleSupplier(params.id);
  return {
    props: {
      supplier: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getSuppliers();
  const paths = data.map((supplier: { id: string }) => ({ params: { id: supplier.id } }));
  return {
    paths,
    fallback: true,
  };
};


export default Update;
