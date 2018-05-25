using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using IDAL;
using System.Data.Entity;

namespace DAL
{
    public class SqlArticles:IArticles
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();


        public IEnumerable<Articles> GetArticles()
        {
            var articles = db.Articles.ToList();
            return articles;
        }
        //public IEnumerable<Articles> GetArticleById(int id)
        //{
        //    var articles = db.Articles.Where(c => c.ArticleID == id);
        //    return articles;
        //}
        public Articles GetArticleById(int id)
        {
            Articles article = db.Articles.Find(id);
            return article;

        }
        //public IEnumerable<Shi> IEGetShiById(int id)
        //{
        //    var shi = db.Shi.Where(c => c.Shi_id == id);
        //    return shi;
        //}
        public IEnumerable<View_ArticleType> GetAllArticle(int articlecategoryId)  //获取所有帖子
        {
            var yuanChuangZd = from po in db.View_ArticleType
                               where po.ArticleCategoryID == articlecategoryId 
                               orderby po.CreateTime descending
                               select po;
            return yuanChuangZd;
        }

        public IEnumerable<Articles> WhereArticleById(int id)
        {
            var article  = db.Articles.Where(c => c.ArticleID == id);
            return article;
        }

        public IEnumerable<Articles> GetArticlesTop6()
        {
            var article6 = db.Articles.ToList().Take(2);
            return article6;
        }

        public IEnumerable<ArticleCom> GetArticleComById(int id)
        {
            var ArticleCom = db.ArticleCom.Include("Articles").Where(c => c.ArticleID == id);
            return ArticleCom;
        }
    }
}
