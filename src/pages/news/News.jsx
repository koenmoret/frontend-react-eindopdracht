import Header from "../../components/global/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

import "./News.css"
import {useCookies} from "react-cookie";


// eslint-disable-next-line react/prop-types
function News() {

    const [articles, setArticles] = useState([]); // Initialize state for articles
    const [query, setQuery] = useState('ministerie van Volksgezondheid'); // Initialize query state
    const [pageSize, setPageSize] = useState(10); // Initialize pageSize state
    const [language, setLanguage] = useState('nl'); // Initialize language state
    const [favorites, setFavorites] = useState([]); // State to store favorite articles
    const [cookies, setCookie] = useCookies(['favorites']); // Use cookies to store favorites

    useEffect(() => {
        // Check if there are favorites in cookies when component mounts
        if (cookies.favorites) {
            setFavorites(cookies.favorites);
        }
    }, [cookies.favorites]);// Update favorites state when cookies.favorites changes

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
            fetchNews();
        },
        [query, pageSize, language]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchNews() {
        const apiKey = "97c237fedab441e5919ed6cfa6aa5767"; //
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`;
        try {
            const response = await axios.get(apiUrl);
            setArticles(response.data.articles); // Update state with fetched articles
        } catch (error) {
            console.error('Error fetching arbo inspection news:', error);
            setArticles([]); // Set articles to empty array on error
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchNews();
    };
    const handleReset = () => {
        setQuery('ministerie van Volksgezondheid'); // Reset query to default value
        setPageSize(10);
        setLanguage('nl');
    };

    const addToFavorites = (article) => {
        const updatedFavorites = [...favorites, article];
        setCookie('favorites', updatedFavorites, { path: '/', maxAge: 365 * 24 * 60 * 60  });
        setFavorites(updatedFavorites);
    };

    const removeFromFavorites = (articleToRemove) => {
        const updatedFavorites = favorites.filter(favorite => favorite.url !== articleToRemove.url);
        setCookie('favorites', updatedFavorites, { path: '/' });
        setFavorites(updatedFavorites);
    };

    const isFavorite = (article) => {
        return favorites.some(favorite => favorite.url === article.url);
    };

    return (
        <>
            <Header setClass="global products"/>
            <main className="outer-container">
                <section className="inner-container news">
                    <section className="news--header">
                    <h2>Nieuws berichten:</h2>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Zoek nieuws..."
                            />
                            <button type="submit">Zoek</button>
                            <button type="button" onClick={handleReset}>Reset</button>
                            <label htmlFor="pageSizeInput">Toon aantal artikelen:</label>
                            <input
                                id="pageSizeInput"
                                type="number"
                                value={pageSize}
                                onChange={(e) => setPageSize(e.target.value)}
                                min="1"
                                max="100"
                                placeholder="Aantal nieuws artikelen"
                            />

                            <select
                                id="languageSelect"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="nl">nederlandse</option>
                                <option value="de">duitse</option>
                                <option value="en">engelse</option>
                            </select>
                            <label htmlFor="languageSelect">nieuws artikelen.</label>
                        </form>
                    </section>
                    {articles.map((article, index) => (
                        <div key={index} className="article">
                            <h4>{article.title}</h4>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Lees meer</a>
                            <span className="btn-favorite" onClick={() => isFavorite(article) ? removeFromFavorites(article) : addToFavorites(article)}>
                                {isFavorite(article) ? "Verwijder uit favoriet" : "Voeg toe aan favorieten"}
                            </span>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}

export default News;