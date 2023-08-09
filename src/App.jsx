import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export const App = () => {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  //NO SE PUEDE UTILIZAR REACT QUERY, SWR, AXIOS, APOLLO

  //EL USEEFFECT SIEMPRE DEBE SER UNA FUNCION SINCRONA
  useEffect(
    () => {
      fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then((res) => res.json())
        .then((data) => {
          const { fact } = data;
          setFact(fact);
        });
    },
    //EN LAS DEPENDENCIAS, CADA VEZ QUE SE ACTUALICE SU VALOR, SE EJECUTARA EL USEEFFECT
    //SI ESTA VACIO SOLO SE EJECUTA LA PRIMERA VEZ QUE SE RENDERICE SI NO TIENE SE EJECUTARA TODO EL TIEMPO
    []
  );

  //PARA TRAER LA IMAGEN CON LA PALABRA CADA VEZ QUE CAMBIA LA PALABRA
  useEffect(() => {
    if (!fact) return;
    //SPLIT SEPARA LA CADENA CON EL INDICADOR QUE LE DEMOS, EN ESTE CASO UN ESPACIO "". Y DEVUELVE UN ARRAY.
    const firstWord = fact.split(" ")[0];
    fetch(
      `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gaticoss</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`https://cataas.com${imageUrl}`} alt="Imag" />}
    </main>
  );
};
