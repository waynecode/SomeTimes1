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
   public class FoodComManager
    {
        IFoodCom ifoodCom = DataAccess.CreateFoodCom();
        public void AddFoodCom(FoodCom foodCom)
        {
            ifoodCom.AddFoodCom(foodCom);
        }
    }
}
