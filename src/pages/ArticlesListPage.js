import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticlesList from '../components/ArticlesList';
import articles from './article-content';

const ArticlesListPage = () => {
    const [articleInfo, setArticleInfo] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get('/api/articles');
            console.log(response.data);
            setArticleInfo(response.data);
        }

        loadData();
    }, []);

    return (
        <>
        <h1>Articles</h1> 
        <ArticlesList articles={articles} articleInfo={articleInfo} />
        </>
    );
}

export default ArticlesListPage;