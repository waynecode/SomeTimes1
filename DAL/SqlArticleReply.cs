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
    public class SqlArticleReply : IArticleReply
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();
        public void AddArticleReply(ArticleReply articleReply)
        {
            db.ArticleReply.Add(articleReply);
            db.SaveChanges();
        }

        public IEnumerable<ArticleReply> GetArticleReply()
        {
            var articleReply = db.ArticleReply.ToList();
            return articleReply;
        }

        public ArticleReply GetArticleReplyById(int? id)
        {
            ArticleReply articleReply = db.ArticleReply.Find(id);
            return articleReply;
        }
    }
}
