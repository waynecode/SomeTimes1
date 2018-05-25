using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using BLL;
using UI.Models;
using PagedList;
namespace UI.Controllers
{
    public class ArticleController : Controller
    {
        FoodsEntities db = new FoodsEntities();
        ArticlesManager articlesmanager = new ArticlesManager();
        // GET: Article
        public ActionResult Article()
        {
            var articles = articlesmanager.GetArticles();
            return View(articles);
        }
        public ActionResult Article6()
        {
            var article6 = articlesmanager.GetArticlesTop6();
            //return View("~/Views/Shared/Article6.cshtml");
            //var article6 = from m in db.Articles.OrderByDescending(a => a.Picture).Take(2)
            //               select m;
            return View(article6);
        }


        public PartialViewResult ArticleIndex(String genreInfoFrom, string currentFilter, int? page)
        {
            var sort1 = db.ArticleCategory.ToList();
            var foods = articlesmanager.GetArticles();
            if (genreInfoFrom != null)
            {
                page = 1;
            }
            else
            {
                genreInfoFrom = currentFilter;
            }
            ViewBag.CurrentFilter = genreInfoFrom;
            if (!String.IsNullOrEmpty(genreInfoFrom))
            {
                foods = foods.Where(x => x.ArticleCategory.ArticleCName == genreInfoFrom);
            }
            int pageSize = 9;
            int pageNumber = (page ?? 1);
            var menu = new TypeViewModels()
            {
                Type = sort1,
                TypeArticle = foods.ToPagedList(pageNumber, pageSize),
            };
            return PartialView("ArticleIndex", menu);

        }

     
        public ActionResult AcIndex(String genreInfoFrom, string currentFilter, int? page)
        {
            //var foods = from m in db.Shi.OrderByDescending(p => p.Shi_id)

            //            select m;
            var articles = articlesmanager.GetArticles();


            if (genreInfoFrom != null)
            {
                page = 1;
            }
            else
            {
                genreInfoFrom = currentFilter;
            }

            ViewBag.CurrentFilter = genreInfoFrom;




            if (!String.IsNullOrEmpty(genreInfoFrom))
            {

                articles = articles.Where(x => x.ArticleCategory.ArticleCName == genreInfoFrom);

            }



            int pageSize = 5;
            int pageNumber = (page ?? 1);

            return View(articles.ToPagedList(pageNumber, pageSize));
        }




    }
}