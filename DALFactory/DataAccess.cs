using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using IDAL;
using System.Configuration;
using System.Reflection;

namespace DALFactory
{
    public class DataAccess
    {
        private static string AssemblyName = ConfigurationManager.AppSettings["Path"].ToString();
        private static string db = ConfigurationManager.AppSettings["DB"].ToString();

        public static IUsers CreateUsers()
        {
            string className = AssemblyName + "." + db + "Users";
            return (IUsers)Assembly.Load(AssemblyName).CreateInstance(className);
        }

        public static IFood CreateFood()
        {
            string className = AssemblyName + "." + db + "Food";
            return (IFood)Assembly.Load(AssemblyName).CreateInstance(className);
        }
	 public static IArticles CreatArticles()
        {
            string className = AssemblyName + "." + db + "Articles";
            return (IArticles)Assembly.Load(AssemblyName).CreateInstance(className);
        }


        public static IArticleCom CreateArticleCom()
        {
            string className = AssemblyName + "." + db + "ArticleCom";
            return (IArticleCom)Assembly.Load(AssemblyName).CreateInstance(className);
        }
        public static IFoodCom CreateFoodCom()
        {
            string className = AssemblyName + "." + db + "FoodCom";
            return (IFoodCom)Assembly.Load(AssemblyName).CreateInstance(className);
        }
        public static IArticleReply CreateArticleReply()
        {
            string className = AssemblyName + "." + db + "ArticleReply";
            return (IArticleReply)Assembly.Load(AssemblyName).CreateInstance(className);
        }
        public static IFoodReply CreateFoodReply()
        {
            string className = AssemblyName + "." + db + "FoodReply";
            return (IFoodReply)Assembly.Load(AssemblyName).CreateInstance(className);
        }
        public static ISpecial CreateSpecial()
        {
            string className = AssemblyName + "." + db + "Special";
            return (ISpecial)Assembly.Load(AssemblyName).CreateInstance(className);
        }
        public static IMenu CreateMenu()
        {
            string className = AssemblyName + "." + db + "Menu";
            return (IMenu)Assembly.Load(AssemblyName).CreateInstance(className);
        }
    }
}
