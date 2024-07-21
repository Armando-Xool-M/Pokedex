import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import styles from "./pokemons.module.css";
import { fetchPokemons } from "../api/fetchPokemons";
import { Pokemon } from "../types/types";
import LoadingScreen from "../Components/LoadingScreen";
import { waitFor } from "../utils/utils";

const Pokemons = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState ("");
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() =>{
        const fetchAllPokemons = async () => {
            const allPokemons = await fetchPokemons();
            setIsLoading(true)
            await waitFor(1000);
            setPokemons(allPokemons);
            setIsLoading(false)
        };
        fetchAllPokemons();

    },[]);

    if(isLoading || !pokemons){
        return <LoadingScreen/>
    }

    const filteresPokemons = pokemons?.slice(0,151).filter ((pokemon) =>{
        return pokemon.name.toLowerCase().match(query.toLocaleLowerCase())
});

    return(
        <>
            <Header query = {query} setQuery = {setQuery}/>
            <main>
                <nav className={styles.nav}>
                    
                    {filteresPokemons?.slice(0, 151).map((pokemon) => (
                        <Link key={pokemon.id}
                        className = {styles.listItem} 
                        to={`/pokemons/${pokemon.name.toLowerCase()}`}>
                        <img 
                            className={styles.listItemIcon}
                            src={pokemon.imgSrc}
                            alt ={pokemon.name}/>

                        <div className={styles.listItemText}>
                            <span> {pokemon.name}</span>
                            <span> {pokemon.id}</span>
                        </div>
                    </Link>
                    ))}
                </nav>
            </main>
            <Footer />
        </>
    );
};

export default Pokemons;