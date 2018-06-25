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
                    return Content("<script>;alert('该账号不存在或者密码错误!');history.go(-1)</script>");
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
        #region 个人设置
        //public ActionResult UpdateInfo(Users user)
        //{
        //    Users u = usersmanager.GetUserByID(int.Parse(Session["UserID"].ToString()));
        //    try
        //    {
        //        u.UserName = user.UserName;
        //        u.Sex = user.Sex;
        //        u.Email = user.Email;
        //        u.Description = user.Description;
        //        usersmanager.UpdateUserInfo(u);
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        string error = ex.Message;

        //    }
        //    return View("UserInfo", u);
        //}
        #endregion
    }
}