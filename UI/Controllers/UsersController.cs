using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Protocols;
using BLL;
using Models;
using UI.Models;
using SomeTimes.Attributes;

namespace UI.Controllers
{
    public class UsersController : Controller
    {
        FoodsEntities db = new FoodsEntities();
        UsersManager usersmanager = new UsersManager();
        // GET: Users
        public ActionResult Index()
        {
            return View();
        }
        #region 注册
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register([Bind(Include = "UserName,Password,Email")] Users users)
        {
            if (ModelState.IsValid)
            {               
                string relativepath = @"/img/touxiang.jpg";
                users.HeadPic = relativepath;
                usersmanager.AddUsers(users);
                return Content("<script>;alert('注册成功！');history.go(-1)</script>");
            }
            else
            {
                return Content("<script>;alert('注册失败！');history.go(-1)</script>");
            }
        }
        #endregion
        #region 登录
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login([Bind(Include = "UserName,Password")]string UserName, string Password)
        {
            try
            {
                var users = usersmanager.Denglu(UserName, Password);
                if (users != null)
                {
                    //保存到Session HttpContext.
                    Session["UserName"] = users.UserName;
                    Session["UserID"] = users.UserID;
                    Session["HeadPic"] = users.HeadPic;
                    return Content("<script>;alert('登录成功!返回首页!');window.location.href='/Home/Index'</script>");
                }
                else
                {
                    return Content("<script>;alert('该账号不存在!');history.go(-1)</script>");
                }
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        #endregion
        #region 头像
        public ActionResult TouXiang()
        {

            return View();
        }
        #endregion
        #region 注销
   
        public ActionResult Logoff()
        {
            Session["UserName"] = null;
            return RedirectToAction("Index", "Home");
        }
        #endregion
        #region 个人中心
        //public ActionResult UserCenter(string Users_id)
        //{
        //    UserCenterViewModel uc = new UserCenterViewModel();
           
        //    uc.Uses1 = usersmanager.IEGetUsersById(Users_id);
        //    ViewBag.Users_id = Users_id;
        //    uc.List1 = new SelectList(db.UserAddress.Where(c => c.Users_id == Users_id), "Address", "Address");//下拉列表数据绑定
        //    uc.UserInfo = db.UserInfo.Find(Users_id);
        //    Session["Guanzhu"] = 0; //未关注
                       
        //    //原创帖
        //    uc.Post1 = postManager.GetPostByUser(Users_id, 1).Take(4);
        //    //uc.PostYuanChuang = postManager.GetPostByUser(Users_id, 1);
        //    //朗诵帖
        //    uc.Post2 = postManager.GetPostByUser(Users_id, 2).Take(4);
        //    //讨论帖
        //    uc.Post3 = postManager.GetPostByUser(Users_id, 3).Take(4);
        //    //草稿
        //    uc.Draft = postManager.GetPostDraftByUser(Users_id);
        //    return View(uc);
        //}
        #endregion
    }
}