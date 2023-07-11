
"use client"

import React from 'react';
import { useTranslations } from "next-intl";

function Home() {
  const t = useTranslations("Home");
  return (
    
    <div>
      <h1>{t("title")}!</h1>
     
      <p>
       {t("paragraphe1")}
      <br></br>
      <br></br>
      {t("paragraphe2")}
      </p>
      <ul>
        <li>
          <strong>{t("auteurs.auteur1")}</strong> - {t("auteurs.description1")}
        </li>
        <li>
          <strong>{t("auteurs.auteur2")}</strong> - {t("auteurs.description2")}
        </li>
        <li>
          <strong>{t("auteurs.auteur3")}</strong> - {t("auteurs.description3")}
        </li>
        <li>
          <strong>{t("auteurs.auteur4")}</strong> - {t("auteurs.description4")}
          </li>
      </ul>
      <p>
      {t("paragraphe3")}
      </p>
      <p>
      {t("paragraphe4")}
      </p>
    </div>
  );
}

export default Home;
