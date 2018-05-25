using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using IDAL;
using DALFactory;

namespace BLL
{
    public class ArticlesManager
    {
        IArticles iarticles = DataAccess.CreatArticles();
       public IEnumerable<Articles> GetArticles()
        {
            var articles = iarticles.GetArticles();
            return articles;
        }
        public IEnumerable<Articles> GetArticlesTop6()
        {
            var article6 = iarticles.GetArticlesTop6();
            return article6;
        }
        //public IEnumerable<Articles> GetArticleById(int id)
        //{
        //    var articles = iarticles.GetArticleById(id);
        //    return articles;
        //}
        public Articles GetArticleById(int id)
        {
            Articles articles = iarticles.GetArticleById(id);
            return articles;
        }
        public IEnumerable<Articles> WhereArticleById(int id)
        {
            var articles = iarticles.WhereArticleById(id);
            return articles;
        }

        public IEnumerable<View_ArticleType> GetAllArticle(int articlecategoryId)
        {
            var allArticle = iarticles.GetAllArticle(articlecategoryId);
            return allArticle;
        }

        public IEnumerable<ArticleCom> GetArticleComById(int id)
        {
            var ArticleCom = iarticles.GetArticleComById(id);
            return ArticleCom;
        }
    }
}
