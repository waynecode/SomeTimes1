using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using BLL;

namespace UI.Controllers
{
    public class TopController : Controller
    {
        // GET: Top
        FoodsEntities db = new FoodsEntities();
        ArticlesManager articlesmanager = new ArticlesManager();
        public ActionResult Article6()
        {
            var article6 = articlesmanager.GetArticlesTop6();
            return View(article6);
        }
    }
}