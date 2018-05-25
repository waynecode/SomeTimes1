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
    public class SqlArticleCom : IArticleCom
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();

        public void AddArticleCom(ArticleCom articleCom)
        {
            db.ArticleCom.Add(articleCom);
                db.SaveChanges();
        }


        public IEnumerable<ArticleCom> GetArticleCom()
        {
            var articleCom = db.ArticleCom.ToList();
            return articleCom;
        }

        public ArticleCom GetArticleComById(int? id)
        {
            ArticleCom articleCom = db.ArticleCom.Find(id);
            return articleCom;
        }

        public IQueryable<ArticleReply> GetArticleReplyByArticleComId(int id)
        {
            var ArticleReply = db.ArticleReply.Include("ArticleCom").Where(c => c.ArticleComID == id);
            return ArticleReply;
        }
    }
}
