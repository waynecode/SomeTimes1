using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IFood
    {
        IQueryable<Food> GetFoodbyTop(int top);
        Food GetFoodById(int? id);
        IEnumerable<FoodCom> GetFoodComById(int id);
        IEnumerable<Food> GetFoodBySId(int id);
        IEnumerable<Food> GetFoodByMId(int id);
        IEnumerable<Food> GetFood();

    }
}
