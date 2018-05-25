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
    public class SqlSpecial : ISpecial
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();

        public IEnumerable<Special> Special5()
        {
            var special = db.Special.ToList();
            return special;
        }

        public IQueryable<Special> GetSpecialbyTop(int top)
        {
            var special = from s in db.Special
                          orderby s.SpecialID descending
                          select s;
            return special.Take(top);
        }
    }
}
