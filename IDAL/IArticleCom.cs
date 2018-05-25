using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IArticleCom
    {
        IEnumerable<ArticleCom> GetArticleCom();
        ArticleCom GetArticleComById(int? id);
        IQueryable<ArticleReply> GetArticleReplyByArticleComId(int id);
        void AddArticleCom(ArticleCom articleCom);
    }
}
