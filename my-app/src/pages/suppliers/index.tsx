import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Suppliers.module.css'
import {getSuppliers, addSupplier} from '@/firebase/suppliers'

import React, { FC, useState } from "react";

interface Props {
  suppliers: any;
}

const Suppliers: FC<Props>  = ({ suppliers }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const newSupplier = {
      name,
      address,
      phone,
      cnpj,
    }
    addSupplier(newSupplier.name, newSupplier.address, newSupplier.phone, newSupplier.cnpj);
    suppliers.push(newSupplier);
    setName("");
    setAddress("");
    setPhone("");
    setCnpj("");
  }

  return (
    <>
      <Head>
        <title>Fornecedores</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.create}>
          <div className={styles.headline}>
            Cadastrar Fornecedor:
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
                <label htmlFor="address" className={styles.label}>Endereco: </label>
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
        <div className={styles.list}>
          <div className={styles.headline}>
            Lista de Fornecedores:
          </div>
          <table className={styles.supplierTable}>
            <tbody>
              {suppliers.map((supplier: any) => (
                <tr key={supplier.id} className={styles.supplier}>
                  <td className={styles.supplierLine}>Nome: {supplier.name}</td>
                  <td className={styles.supplierLine}>Endereço: {supplier.address}</td>
                  <td className={styles.supplierLine}>Telefone: {supplier.phone}</td>
                  <td className={styles.supplierLine}>CNPJ: {supplier.cnpj}</td>
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
  const suppliers = await getSuppliers();
  return {
    props: { suppliers },
  };
}

export default Suppliers;
