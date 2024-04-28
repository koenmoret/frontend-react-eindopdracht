import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import sanitizeHtml from 'sanitize-html';
import Header from "../../components/global/Header.jsx";
import PageViewer from "../../components/elearning/PageViewer.jsx";
// import PropTypes from 'prop-types';


import "./Elearning.css"

// eslint-disable-next-line react/prop-types
function Elearning() {

    const location = useLocation();
    const navigate = useNavigate();
    const {product} = location.state;
    //const [productImagePath, setProductImagePath] = useState(null);
    // const [imageChapterPaths, setChapterImagePaths] = useState({});
    const [imagePagePaths, setPageImagePaths] = useState({});
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [showPageViewer, setShowPageViewer] = useState(false);
    const navigateToChapter = (index) => {
        setCurrentChapterIndex(index);
        setCurrentPageIndex(0); // Reset current page index
        setShowPageViewer(false); // Reset showPageViewer state
    };

    useEffect(() => {
        // Importeer de afbeelding voor het product
        // const importProductImage = async () => {
        //     try {
        //         const image = await import(`../../assets/images/${product.id}/${product.image}`);
        //         setProductImagePath(image.default);
        //     } catch (error) {
        //         console.error("Er is een fout opgetreden bij het laden van de productafbeelding:", error);
        //     }
        // };
        // importProductImage();

        // Importeer alle afbeeldingen voor de hoofdstukken
        // const importChapterImages = async () => {
        //     const pathsChapter = {};
        //     for (const chapter of product.chapters) {
        //         for (const image of chapter.image) {
        //             const path = `../../assets/images/${product.id}/${chapter.id}/${image}`;
        //             try {
        //                 const importedImage = await import(path);
        //                 if (!pathsChapter[chapter.id]) {
        //                     pathsChapter[chapter.id] = [];
        //                 }
        //                 pathsChapter[chapter.id].push(importedImage.default);
        //             } catch (error) {
        //                 console.error("Er is een fout opgetreden bij het laden van de hoofdstukafbeelding:", error);
        //             }
        //         }
        //     }
        //     //setChapterImagePaths(pathsChapter);
        // };
        // importChapterImages();

        const importPagesImages = async () => {
            const pathsPages = {};
            for (const chapter of product.chapters) {
                if (chapter.pages) {
                    for (const page of chapter.pages) {
                        if (page.img) {
                            console.log(page.img);
                            for (const image of page.img) {
                                const path = `../../assets/images/${product.id}/${chapter.id}/p${page.id}/${image}`;
                                console.log(path);
                                try {
                                    const importedImage = await import(path);
                                    if (!pathsPages[image]) {
                                        pathsPages[image] = [];
                                    }
                                    pathsPages[image].push(importedImage.default);
                                } catch (error) {
                                    console.error("Er is een fout opgetreden bij het laden van de hoofdstukafbeelding:", error);
                                }
                            }
                        }
                    }
                }
            }
            setPageImagePaths(pathsPages);
        };
        importPagesImages();
    }, [product]);


    // Functie om HTML-inhoud te saniteren
    const sanitizeHtmlContent = (htmlContent) => {
        // Configureer de sanitizer opties
        const sanitizedHtml = sanitizeHtml(htmlContent, {
            allowedTags: ['h1', 'h2', 'h3', 'p', 'a', 'ul', 'ol', 'li', 'b', 'i', 'strong', 'em', 'u', 'img', 'span', 'div', 'br'],
            allowedAttributes: {
                'a': ['href'], 'img': ['src', 'alt', 'style'], 'div': ['class'], 'span': ['class']
            },
            // Voeg hier eventueel andere configuraties toe afhankelijk van je behoeften
        });
        return sanitizedHtml;
    };

    const handleNextChapter = () => {
        if (currentChapterIndex < product.chapters.length - 1) {
            setCurrentChapterIndex(prevIndex => prevIndex + 1);
            setCurrentPageIndex(0); // Reset current page index
            setShowPageViewer(false); // Reset showPageViewer state
        } else {
            console.log("Dit is het laatste hoofdstuk.");
            navigate('/dashboard');
        }
    };

    const handleNextPage = () => {
        if (currentPageIndex < product.chapters[currentChapterIndex].pages.length - 1) {
            setCurrentPageIndex(prevIndex => prevIndex + 1);
        } else {
            handleNextChapter();
        }
    };

    const handlePreviousPage = () => {
        if (currentPageIndex > 0) {
            // Als het niet de eerste pagina van het hoofdstuk is, ga naar de vorige pagina
            setCurrentPageIndex(prevIndex => prevIndex - 1);
        } else {
            setCurrentChapterIndex(prevIndex => prevIndex);
            setCurrentPageIndex(0); // Reset current page index
            setShowPageViewer(false); // Reset showPageViewer state
        }
    };

    const handleShowPageViewer = () => {
        setShowPageViewer(true);
    };

    return (
        <>
            <Header setClass="global products"/>

            <main className="outer-container">
                <section className="inner-container elearning">
                    <h2>{product.title}</h2>

                    <div className="elearning--page">
                        <div className="elearning--menu">
                            <strong>Menu:</strong>
                            {product.chapters && product.chapters.map((chapter, index) => (
                                <span key={index}
                                      onClick={() => navigateToChapter(index)}
                                      className={currentChapterIndex === index ? 'active-chapter' : ''}
                                >
            {chapter.title}
                        </span>
                            ))}
                        </div>

                        <div className="elearning--intro">
                            {product.chapters && product.chapters.map((chapter, index) => (
                                (index === currentChapterIndex && !showPageViewer && chapter.html) && (
                                    <div key={index} className="inner-container-page"
                                         dangerouslySetInnerHTML={{__html: sanitizeHtmlContent(chapter.html)}}/>
                                )
                            ))}
                            {showPageViewer && (
                                <PageViewer
                                    chapter={product.chapters[currentChapterIndex]}
                                    pageIndex={currentPageIndex}
                                    sanitizeHtmlContent={sanitizeHtmlContent}
                                    imagePagePaths={imagePagePaths}
                                />
                            )}
                        </div>
                    </div>
                    <div className="elearning--nav">
                        {(!showPageViewer && (currentChapterIndex === product.chapters.length - 1 || !product.chapters[currentChapterIndex].pages)) && (
                            <button onClick={handleNextChapter}>Volgend hoofdstuk</button>
                        )}
                        {!showPageViewer && (
                            <div>
                                {currentChapterIndex !== product.chapters.length - 1 && product.chapters[currentChapterIndex].pages && (
                                    <button onClick={handleShowPageViewer}>Volgende pagina</button>
                                )}
                            </div>
                        )}
                        {showPageViewer && (
                            <div>
                                <button onClick={handlePreviousPage}>Vorige pagina</button>
                                {currentPageIndex < product.chapters[currentChapterIndex].pages.length - 1 && (
                                    <button onClick={handleNextPage}>Volgende pagina</button>
                                )}
                                {currentPageIndex === product.chapters[currentChapterIndex].pages.length - 1 && (
                                    <button onClick={handleNextChapter}>Volgend hoofdstuk</button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Elearning;
