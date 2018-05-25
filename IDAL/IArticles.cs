using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IArticles
    {
        IEnumerable<Articles> GetArticles();
        Articles GetArticleById(int id);
        IEnumerable<Articles> WhereArticleById(int id);
        IEnumerable<Articles> GetArticlesTop6();

        IEnumerable<View_ArticleType> GetAllArticle(int articlecategoryId);
        IEnumerable<ArticleCom> GetArticleComById(int id);

    }
}
