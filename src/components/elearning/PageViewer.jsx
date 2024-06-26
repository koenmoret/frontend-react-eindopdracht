import PropTypes from 'prop-types';

function PageViewer({ chapter, pageIndex, sanitizeHtmlContent }) {
    const currentPage = chapter.pages && chapter.pages[pageIndex];

    if (!currentPage) {
        return null; // Return null if page does not exist
    }

    return (
        <div className="page-viewer" dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(currentPage.html) }} />
    );
}

PageViewer.propTypes = {
    chapter: PropTypes.object.isRequired,
    pageIndex: PropTypes.number.isRequired,
    sanitizeHtmlContent: PropTypes.func.isRequired,
    imagePagePaths: PropTypes.object.isRequired
};

export default PageViewer;
