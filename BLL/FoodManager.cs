using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using IDAL;
using DALFactory;

namespace BLL
{
    
    public class FoodManager
    {
        IFood ifood = DataAccess.CreateFood();

        public IQueryable<Food> GetFoodbyTop(int top)
        {
            var food = ifood.GetFoodbyTop(top);
            return food;
        }

        public Food GetFoodById(int? id)
        {
            Food food = ifood.GetFoodById(id);
            return food;
        }
        public IEnumerable<FoodCom> GetFoodComById(int id)
        {
            var FoodCom = ifood.GetFoodComById(id);
            return FoodCom;
        }
        public IEnumerable<Food> GetFoodBySId(int id)
        {
            var foodss = ifood.GetFoodBySId(id);
            return foodss;
        }
        public IEnumerable<Food> GetFoodByMId(int id)
        {
            var mfood = ifood.GetFoodByMId(id);
            return mfood;
        }
        public IEnumerable<Food> GetFood()
        {
            var foods = ifood.GetFood();
            return foods;
        }
    }
}
