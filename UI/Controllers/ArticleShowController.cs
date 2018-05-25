using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using BLL;
using UI.Models;
using SomeTimes.Attributes;


namespace UI.Controllers
{
    public class ArticleShowController : Controller
    {
        ArticlesManager articlesmanager = new ArticlesManager();
        ArticleComManager articlecommanager = new ArticleComManager();
        ArticleReplyManager articlereplymanager = new ArticleReplyManager();
        // GET: ArticleShow
        #region 文章详情页
        public ActionResult ArticleDetails(int id)
        {
             Session["aid"] = id;
            int a_id = Convert.ToInt32(Session["aid"]);
            var article = articlesmanager.GetArticleById(id);
           if(article == null)
            {
                return HttpNotFound();
            }
            return View(article);
        }
       #endregion


        #region 文章评论回复
        public ActionResult ArticleComs(int id)
        {
            id = Convert.ToInt32(Session["aid"]);
            var comment = articlesmanager.GetArticleComById(id);
            return View(comment);
        }

        [HttpPost]
        [ValidateInput(false)]
        [Login]
        public ActionResult ArticleComs(ArticleCom ArticleCom)
        {
           
            int aid = Convert.ToInt32(Session["aid"]);
            int userid = Convert.ToInt32(Session["UserID"]);
            string textarea = Request["pingluntextarea"];
            if (ModelState.IsValid)
            {
                if (textarea != "")
                {
                    ArticleCom.UserID = userid;
                    ArticleCom.ArticleID = aid;
                    ArticleCom.ComTime= System.DateTime.Now;
                    ArticleCom.ComContent = textarea;
                    articlecommanager.AddArticleCom(ArticleCom);
                }
                else
                {
                    return Content("<script>alert('评论不能为空！');history.go(-1)</script>");
                }
            }
            return RedirectToAction("ArticleDetails", "ArticleShow", new { id = aid });
        }
        public ActionResult ReplyArticleComments()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ReplyArticleComments(int ArticleComID, ArticleReply replya)
        {
            int aid = Convert.ToInt32(Session["aid"]);
            string replytext = Request.Form["textarea1"];
            if (replytext == "")
            {
                return Content("<script>;alert('回复不能为空');history.go(-1)</script>");
            }
            else
            {
                int userid = Convert.ToInt32(Session["UserID"]);
                replya.ArticleComID = ArticleComID;
                replya.UserID = userid;
                replya.ReplyContent = replytext;
                replya.ReplyTime = DateTime.Now;
                articlereplymanager.AddArticleReply(replya);  
                  
            }
            return RedirectToAction("ArticleDetails", "ArticleShow", new { id = aid });
        }
        #endregion
    

        
        }
}