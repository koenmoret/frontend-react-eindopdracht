import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import sanitizeHtml from 'sanitize-html';
import Header from "../../components/global/Header.jsx";
import PageViewer from "../../components/elearning/PageViewer.jsx";
import "./Elearning.css"


// eslint-disable-next-line react/prop-types
function Elearning() {

    const location = useLocation();
    const navigate = useNavigate();
    const {product} = location.state;
    const [imagePagePaths, setPageImagePaths] = useState({});
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [chapterStatus, setChapterStatus] = useState({});
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [showPageViewer, setShowPageViewer] = useState(false);
    const [cookies, setCookie] = useCookies([`${product.id}_chapterStatus`]);

    const navigateToChapter = (index) => {
        setCurrentChapterIndex(index);
        setCurrentPageIndex(0); // Reset current page index
        setShowPageViewer(false); // Reset showPageViewer state
    };

    useEffect(() => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 365);
        setCookie(`${product.id}_chapterStatus`, chapterStatus, {
            expires: expirationDate
        });
        // Check last page of chapter
        const isLastPageLastChapter = currentChapterIndex === product.chapters.length - 1 &&
            currentPageIndex === product.chapters[currentChapterIndex].pages.length - 1;

        if (isLastPageLastChapter && Object.keys(chapterStatus).length > 0) {
            navigate('/dashboard');
        }
    }, [chapterStatus]);

    useEffect(() => {
        const chapterStatusCookie = cookies[`${product.id}_chapterStatus`];
        if (chapterStatusCookie) {
            setChapterStatus(chapterStatusCookie);
        }
        const importPagesImages = async () => {
            const pathsPages = {};
            for (const chapter of product.chapters) {
                if (chapter.pages) {
                    for (const page of chapter.pages) {
                        if (page.img) {
                            for (const image of page.img) {
                                const path = `../../assets/images/${product.id}/${chapter.id}/p${page.id}/${image}`;
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

    const sanitizeHtmlContent = (htmlContent) => {
        // Configureer de sanitizer opties
        const sanitizedHtml = sanitizeHtml(htmlContent, {
            allowedTags: ['h1', 'h2', 'h3', 'p', 'a', 'ul', 'ol', 'li', 'b', 'i', 'strong', 'em', 'u', 'img', 'span', 'div', 'br'],
            allowedAttributes: {
                'a': ['href'], 'img': ['src', 'alt', 'style'], 'div': ['class'], 'span': ['class']
            },
        });
        return sanitizedHtml;
    };
    const updateChapterStatus = (chapterId, status) => {
        setChapterStatus(prevStatus => ({
            ...prevStatus,
            [chapterId]: status
        }));
    };
    const handleNextChapter = () => {
        if (currentChapterIndex < product.chapters.length - 1) {
            setCurrentChapterIndex(prevIndex => prevIndex + 1);
            setCurrentPageIndex(0); // Reset current page index
            setShowPageViewer(false); // Reset showPageViewer state
            updateChapterStatus(product.chapters[currentChapterIndex].id, true);  // Mark the chapter as completed
        } else {
            updateChapterStatus(product.chapters[currentChapterIndex].id, true);
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
            // If it is not the first page of the chapter, go to the previous page
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
                                      className={currentChapterIndex === index ? 'active-chapter' : ''}>
                                    {chapter.title}
                                    {chapterStatus[chapter.id] && <span className="completed-chapter-icon">✓</span>}
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
                        {(!product.chapters[currentChapterIndex].pages) && (
                            <button onClick={handleNextChapter}>Volgend hoofdstuk</button>
                        )}
                        {!showPageViewer && (
                            <div>
                                {product.chapters[currentChapterIndex].pages && (
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
                                    <button
                                        onClick={handleNextChapter}>{currentChapterIndex + 1 === product.chapters.length ? `Einde E-learning` : `Volgend hoofdstuk`}</button>
                                )}
                            </div>
                        )}

                    </div>
                    <div className="elearning--page-numbers">
                        {product.chapters[currentChapterIndex].pages && (
                            <span>
                                {(currentPageIndex === 0 && !showPageViewer) ? `Pagina ${currentPageIndex + 1} van ${product.chapters[currentChapterIndex].pages.length + 1}` : `Pagina ${currentPageIndex + 2} van ${product.chapters[currentChapterIndex].pages.length + 1}`}
                            </span>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Elearning;
