import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { WalletContextProvider } from "../components/WalletContextProvider";
import { SendSolanaForm } from "../components/SendSolana";

const Home: NextPage = (props) => {
  return (
    <WalletContextProvider>
      <div className={styles.App}>
        <Head>
          <title>Wallet-Adapter Example</title>
          <meta name="description" content="Wallet-Adapter Example" />
        </Head>
        <AppBar />
        <SendSolanaForm />
      </div>
    </WalletContextProvider>
  );
};

export default Home;
