import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
import articles from './article-content';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState(null);
    const { articleName } = useParams();

    const [postedBy, setPostedBy] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get('/api/articles/' + articleName);
            console.log(response.data);
            setArticleInfo(response.data);
        }

        loadData();
    }, [articleName]);

    const selectedArticle = articles.find(
        article => article.name === articleName,
    );
    const relatedArticles = articles.filter(article => article.name !== articleName);

    if (!selectedArticle) {
        return (
            <NotFoundPage />
        );
    }

    const upvoteArticle = async () => {
        const response = await axios.post('/api/articles/' + articleName + '/upvotes');
        setArticleInfo(response.data);
    }

    const addComment = async () => {
        const response = await axios.post('/api/articles/' + articleName + '/comments', {
            postedBy,
            text,
        });
        setArticleInfo(response.data);
        setPostedBy('');
        setText('');
    }

    return (
        <>
        <h1>{selectedArticle.title}</h1>
        {articleInfo && <div id="upvotes-section">
            <button onClick={upvoteArticle}>Add Upvote</button>
            <p>This article has {articleInfo.upvotes} upvotes</p>
        </div>}
        {selectedArticle.content.map(paragraph => (
            <p>{paragraph}</p>
        ))}
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {errorMessage && <p>{errorMessage}</p>}
            <label>
                Name:
                <input
                    type="text"
                    value={postedBy}
                    onChange={e => setPostedBy(e.target.value)} />
            </label>
            <label>
                Comment:
                <textarea
                    rows="4"
                    cols="50"
                    value={text}
                    onChange={e => setText(e.target.value)} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
        <h3>Comments:</h3>
        {articleInfo && articleInfo.comments.map(comment => (
            <div className="comment">
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
        <h3>Related Articles</h3>
        <ArticlesList articles={relatedArticles} />
        </>
    );
}

export default ArticlePage;