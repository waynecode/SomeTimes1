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
    public class Special2Controller : Controller
    {
        FoodsEntities db = new FoodsEntities();
        SpecialManager specialmanager = new SpecialManager();
        FoodManager foodManager = new FoodManager();
        // GET: Special2
        public PartialViewResult FoodSpecial(String genreInfoFrom, string currentFilter, int? page)
        {
            var sort1 = db.Special.ToList();
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
            int pageSize = 9;
            int pageNumber = (page ?? 1);
            var menu = new FoodSpecialViewModels()
            {
                Special = sort1,
                SpecialFood = foods.ToPagedList(pageNumber, pageSize),
            };
            return PartialView("FoodSpecial", menu);
        }





        public ActionResult FoodSpecialmid(String genreInfoFrom, string currentFilter, int? page)
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
            int pageSize = 16;
            int pageNumber = (page ?? 1);
            return View(foods.ToPagedList(pageNumber, pageSize));
        }
    }
}