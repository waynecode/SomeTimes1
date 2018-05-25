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
   public class FoodReplyManager
    {
        IFoodReply ifoodReply = DataAccess.CreateFoodReply();
        public void AddFoodReply(FoodReply foodReply)
        {
            ifoodReply.AddFoodReply(foodReply);

        }
    }
}
