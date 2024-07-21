import { Await, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/fetchPokemon"
import PokeballImg from "../assets/pokeball.png";import Footer from "../Components/Footer";
import styles from "./pokemon.module.css"
import { PokemonDetalist } from "../types/types";
import LoadingScreen from "../Components/LoadingScreen";
import { waitFor } from "../utils/utils";

const Pokemon = () => {
    const [isLoading, setLoading] = useState (false);
    const [pokemon, setPokemon] = useState<PokemonDetalist>();
    const {name} = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        async function getPokemon  (){
            setLoading(true);
            const fetchdPokemon = await fetchPokemon (name as string)
            await waitFor(300);
            setPokemon (fetchdPokemon);
            setLoading(false)
        }
        getPokemon();
    },[name]);

    if(isLoading || !pokemon) return <LoadingScreen/>

    return(
        <>
            <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                <img className={styles.pokeballImg}
                src={PokeballImg}
                alt="Pokeball"/>
                Go Back
            </button>
            <div className={styles.pokemon}>
                <main className={styles.pokemonInfo}>
                    <div className={styles.pokemonTitle}>{name?.toUpperCase()}</div>
                    <div>N°. {pokemon?.id}</div>
                    <div>
                        <img className={styles.pokemonInfoImg} src={pokemon?.imgSrc} alt={pokemon?.name} />
                    </div>
                    <div>HP: {pokemon?.hp}</div>
                    <div>Atack: {pokemon?.attack}</div>
                    <div>Defense: {pokemon?.defense}</div>
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Pokemon;