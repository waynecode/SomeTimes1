using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using UI.Models;
using Models;
using SomeTimes.Attributes;

namespace UI.Controllers
{
    public class HomeController : Controller
    {

        FoodManager foodManager = new FoodManager();
        UsersManager usersManager = new UsersManager();
        FoodComManager foodcommanager = new FoodComManager();
        FoodReplyManager foodreplymanager = new FoodReplyManager();
        MenuManager menumanager = new MenuManager();
        SpecialManager specialmanager = new SpecialManager();
        #region 首页展示
        public ActionResult Index()
        {
            var Foodtop8 = foodManager.GetFoodbyTop(9);
            var Menutop5 = menumanager.GetMenubyTop(6);
            var Specialtop5 = specialmanager.GetSpecialbyTop(6);
            Models.HomeIndexViewModel indexvm = new Models.HomeIndexViewModel();
            indexvm.Foodtop8 = Foodtop8;
            indexvm.Menutop5 = Menutop5;
            indexvm.Specialtop5 = Specialtop5;

            return View(indexvm);
        }
        #endregion
        #region 食谱详情页
        public ActionResult FoodDetails(int id)
        {
            Session["FoodID"] = id;
            int FoodID = Convert.ToInt32(Session["FoodID"]);
            var shis = foodManager.GetFoodById(FoodID);
            if (shis == null)
            {
                return HttpNotFound();
            }
            return View(shis);
        }
       
        #endregion
        #region 食谱评论回复
        public ActionResult FoodComs(int id)
        {
            id = Convert.ToInt32(Session["FoodID"]);
            var comment = foodManager.GetFoodComById(id);
            return View(comment);
        }

        [HttpPost]
        [ValidateInput(false)]
        [Login]
        public ActionResult FoodComs(FoodCom FoodCom)
        {

            int fid = Convert.ToInt32(Session["FoodID"]);
            int userid = Convert.ToInt32(Session["UserID"]);
            string textarea = Request["pingluntextarea"];
            if (ModelState.IsValid)
            {
                if (textarea != "")
                {
                    FoodCom.UserID = userid;
                    FoodCom.FoodID= fid;
                    FoodCom.ComTime = System.DateTime.Now;
                    FoodCom.ComContent = textarea;
                    foodcommanager.AddFoodCom(FoodCom);
                }
                else
                {
                    return Content("<script>alert('评论不能为空！');history.go(-1)</script>");
                }
            }
            return RedirectToAction("FoodDetails", "Home", new { id = fid });
        }
        public ActionResult ReplyFoodComments()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ReplyFoodComments(int FoodComID, FoodReply replya)
        {
            int fid = Convert.ToInt32(Session["FoodID"]);
            string replytext = Request.Form["textarea1"];
            if (replytext == "")
            {
                return Content("<script>;alert('回复不能为空');history.go(-1)</script>");
            }
            else
            {
                int userid = Convert.ToInt32(Session["UserID"]);
                replya.FoodComID = FoodComID;
                replya.UserID = userid;
                replya.ReplyContent = replytext;
                replya.ReplyTime = DateTime.Now;
                foodreplymanager.AddFoodReply(replya);

            }
            return RedirectToAction("FoodDetails", "Home", new { id = fid });
        }

        #endregion
        public ActionResult FoodSpecial(int id)
        {
            var foodss = foodManager.GetFoodBySId(id);
            return View(foodss);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}