using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Models;

namespace UI.Models
{
    public class ArticleViewModels
    {
        //public IEnumerable<ArticleViewModels> GetArticleById { get; set; }
        //public ArticleViewModels GetArticleById { get; set; }

        //public static implicit operator ArticleViewModels(int v)
        //{
        //    throw new NotImplementedException();
        //}
        public Food food { get; set; }
        public Special special { get; set; }
    }
}