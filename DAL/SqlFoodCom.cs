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
    public class SqlFoodCom : IFoodCom
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();
        public void AddFoodCom(FoodCom foodCom)
        {
            db.FoodCom.Add(foodCom);
            db.SaveChanges();
        }
    }
}
