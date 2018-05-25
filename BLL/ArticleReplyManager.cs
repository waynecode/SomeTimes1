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
   public class ArticleReplyManager
    {

        IArticleReply iarticleReply = DataAccess.CreateArticleReply();

        public IEnumerable<ArticleReply> GetArticleReply()
        {
            var articleReply = iarticleReply.GetArticleReply();
            return articleReply;
        }
        public void AddArticleReply(ArticleReply articleReply)
        {
            iarticleReply.AddArticleReply(articleReply);

        }
        public ArticleReply GetShiReplyById(int? id)
        {
            ArticleReply articleReply = iarticleReply.GetArticleReplyById(id);
            return articleReply;
        }
    }
}
