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
   public class ArticleComManager
    {
        IArticleCom iarticleCom = DataAccess.CreateArticleCom();
        public IEnumerable<ArticleCom> GetArticleCom()
        {
            var articleCom = iarticleCom.GetArticleCom();
            return articleCom;
        }
        public ArticleCom GetArticleComById(int? id)
        {
            ArticleCom articleCom = iarticleCom.GetArticleComById(id);
            return articleCom;
        }
        public IEnumerable<ArticleCom> GetArticleCom(int id)
        {
            var ArticleCom = iarticleCom.GetArticleCom();
            return ArticleCom;
        }
        public void AddArticleCom(ArticleCom articleCom)
        {
            iarticleCom.AddArticleCom(articleCom);
        }
        public IQueryable<ArticleReply> GetArticleReplyByArticleComId(int id)
        {
            var articleReply = iarticleCom.GetArticleReplyByArticleComId(id);
            return articleReply;
        }
    }
}
