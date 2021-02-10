import Head from "next/head";
import React from "react";
import Link from "next/link";
// import styles from "../styles/Home.module.css";

export const Home: React.FC = () => {
  return (
    <div>
      <Link href="/project">
        <a>
          <h3>Project View</h3>
        </a>
      </Link>
    </div>
  );
};

export default Home;
