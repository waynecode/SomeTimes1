using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using IDAL;
using System.Data.Entity;
namespace DAL
{
    public class SqlFood:IFood
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();

        public IQueryable<Food> GetFoodbyTop(int top)
        {
            var food = from f in db.Food
                      orderby f.FoodID descending
                      select f;
            return food.Take(top);
        }
        public Food GetFoodById(int? id)
        {
            Food food = db.Food.Find(id);
            return food;
        }

        public IEnumerable<FoodCom> GetFoodComById(int id)
        {
            var FoodCom = db.FoodCom.Include("Food").Where(c => c.FoodID == id);
            return FoodCom;
        }

        public IEnumerable<Food> GetFoodBySId(int id)
        {
            var foodss = db.Food.Where(c => c.SpecialID == id);
            return foodss;
        }

        public IEnumerable<Food> GetFoodByMId(int id)
        {
            var mfood = db.Food.Where(c => c.MenuID == id);
            return mfood;
        }

        public IEnumerable<Food> GetFood()
        {
            var foods = db.Food.ToList();
            return foods;
        }
    }    
}

