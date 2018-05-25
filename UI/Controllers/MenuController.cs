using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using BLL;
using UI.Models;

namespace UI.Controllers
{
    public class MenuController : Controller
    {
        FoodsEntities db = new FoodsEntities();
        FoodManager foodManager = new FoodManager();
        MenuManager menuManager = new MenuManager();
        // GET: Menu
        public ActionResult MenuShow()
        {
            var menu = menuManager.Menu();
            return View(menu);
        }
        public ActionResult MenuFood(int id)
        {
            var mfood = foodManager.GetFoodByMId(id);
            return View(mfood);
        }
    }
}