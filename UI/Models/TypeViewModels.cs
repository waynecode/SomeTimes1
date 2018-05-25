using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Models;

namespace UI.Models
{
    public class TypeViewModels
    {
        public IEnumerable<ArticleCategory> Type { get; set; }
        public IEnumerable<Articles> TypeArticle { get; set; }
        public IEnumerable<View_ArticleType> AllArticle { get; set; }
    }
}