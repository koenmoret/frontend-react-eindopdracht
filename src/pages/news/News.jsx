import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../components/global/Header.jsx";
import {FavoriteContext} from "../../context/FavoritesContext.jsx";
import "./News.css";


function News() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('ministerie van Volksgezondheid');
    const [pageSize, setPageSize] = useState(10);
    const [language, setLanguage] = useState('nl');
    const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoriteContext);

    useEffect(() => {
        fetchNews();
    }, [query, pageSize]);

    useEffect(() => {
        if (language === 'de') {
            setQuery('gesundheitsministerium');
        }
        else if (language === 'en') {
            setQuery('ministry of health');
        }
        else if (language === 'nl') {
            setQuery('ministerie van Volksgezondheid');
        }
        fetchNews();
    }, [language]);

    async function fetchNews() {
        const apiKey = "97c237fedab441e5919ed6cfa6aa5767";
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`;
        try {
            const response = await axios.get(apiUrl);
            setArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            setArticles([]);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchNews();
    };

    const handleReset = () => {
        setQuery('ministerie van Volksgezondheid');
        setPageSize(10);
        setLanguage('nl');
    };

    return (
        <>
            <Header setClass="global products" />
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
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                min="1"
                                max="100"
                                placeholder="Aantal nieuws artikelen"
                            />
                            <label htmlFor="languageSelect">Taal van nieuws artikelen:</label>
                            <select
                                id="languageSelect"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="nl">Nederlands</option>
                                <option value="de">Duits</option>
                                <option value="en">Engels</option>
                            </select>
                        </form>
                    </section>
                    {articles.map((article, index) => (
                        <div key={index} className="article">
                            <h4>{article.title}</h4>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Lees meer</a>
                            <span
                                className="btn-favorite"
                                onClick={() => isFavorite(article) ? removeFromFavorites(article) : addToFavorites(article)}
                            >
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
