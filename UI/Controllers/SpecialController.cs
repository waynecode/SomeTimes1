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
    public class SpecialController : Controller
    {
        FoodsEntities db = new FoodsEntities();
        SpecialManager specialmanager = new SpecialManager();
        FoodManager foodManager = new FoodManager();
        // GET: Special
        public ActionResult SpecialShow()
        {
            var special5 = specialmanager.Special5();
            return View(special5);
        }
        public ActionResult FoodSpecial(int id)
        {
            var foodss = foodManager.GetFoodBySId(id);
            return View(foodss);
        }
    }
}