import { Link } from 'react-router-dom';

const ArticlesList = ({ articles, articleInfo = [] }) => (
    <>
    {articles.map(article => {
        const info = articleInfo.find(a => a.name === article.name);

        return (
            <Link className="article-list-item" to={`/articles/${article.name}`}>
                <h3>{article.title}</h3>
                {info && <div>Upvotes: {info.upvotes}</div>}
                {info && <div># of Comments: {info.comments.length}</div>}
                <p>{article.content[0].substring(0, 150)}...</p>
            </Link>
        );
    })}
    </>
);

export default ArticlesList;