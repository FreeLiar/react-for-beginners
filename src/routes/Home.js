import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [showing, setShowing] = useState(false);

    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => {
        setKeyword(event.target.value);
    };
    const onClickToggle = () => setShowing((prev) => !prev);

    useEffect(() => {
        console.log("i run only once");
    }, []);
    useEffect(() => {
        if (keyword !== "" && keyword.length > 6) {
            console.log("i run when keyword change", keyword);
        }
    }, [keyword]);
    useEffect(() => {
        console.log("i run when keyword conter ", counter);
    }, [keyword, counter]);

    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);

    const onChangeToDo = (event) => {
        setToDo(event.target.value);
        console.log(toDo);
    };

    const onSubmitToDo = (event) => {
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        setToDo("");
        setToDos((currentArray) => [toDo, ...currentArray]);
    };
    console.log(toDos);

    function Hello() {
        function destroyedFn() {
            console.log("destoryed FN");
        }
        function effectFn() {
            console.log("create FN");
            return destroyedFn;
        }
        useEffect(effectFn, []);
        return <h1>hello</h1>;
    }

    function Coin() {
        const [loading, setLoading] = useState(true);
        const [coins, setCoins] = useState([]);
        useEffect(() => {
            fetch("https://api.coinpaprika.com/v1/tickers")
                .then((response) => response.json())
                .then((json) => {
                    setCoins(json);
                    setLoading(false);
                });
        }, []);
        return (
            <div>
                <h1>THE COINS! {loading ? "" : `(${coins.length})`}</h1>
                {loading ? (
                    <strong>Loading...</strong>
                ) : (
                    <select>
                        {coins.map((coin) => (
                            <option key={coin.id}>
                                {coin.name} ({coin.symbol} : $
                                {coin.quotes.USD.price} USD )
                            </option>
                        ))}
                    </select>
                )}
            </div>
        );
    }

    function MovieSort() {
        const [loading2, setLoading2] = useState(true);
        const [movies, setMovies] = useState([]);
        const getMoives = async () => {
            const json = await (
                await fetch(
                    `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
                )
            ).json();
            setMovies(json.data.movies);
            setLoading2(false);
        };
        useEffect(() => {
            getMoives();
        }, []);
        console.log(movies);
        return (
            <div>
                {loading2 ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        {movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                coverImg={movie.medium_cover_image}
                                title={movie.title}
                                summary={movie.summary}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="App">
            <input
                value={keyword}
                onChange={onChange}
                type="text"
                placeholder="Search here.."
            />
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
            <button onClick={onClickToggle}>{showing ? "HIDE" : "SHOW"}</button>
            {showing ? <Hello /> : null}

            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmitToDo}>
                <input
                    onChange={onChangeToDo}
                    value={toDo}
                    type="text"
                    placeholder="Write your to do..."
                />
                <button>Add To DO</button>
            </form>
            <hr />
            <ul>
                {toDos.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <Coin />

            <MovieSort />
        </div>
    );
}

export default Home;
