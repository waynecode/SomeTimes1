using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IArticleReply
    {
        IEnumerable<ArticleReply> GetArticleReply();
        ArticleReply GetArticleReplyById(int? id);
        void AddArticleReply(ArticleReply articleReply);
    }
}
