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

        public ActionResult SpecialTop()
        {
            var sort = db.Special.ToList();

            return View(sort);

        }

        public ActionResult SpecialMid(String genreInfoFrom, string currentFilter, int? page)
        {

            var foods = foodManager.GetFood();


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

                foods = foods.Where(x => x.Special.SpecialName == genreInfoFrom);

            }



            int pageSize = 18;
            int pageNumber = (page ?? 1);

            return PartialView(foods.ToPagedList(pageNumber, pageSize));
        }
    }
}