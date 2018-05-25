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
    public class SqlMenu : IMenu
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();
        public IEnumerable<Menu> Menu()
        {
            var menu = db.Menu.ToList();
            return menu;
        }
        public IQueryable<Menu> GetMenubyTop(int top)
        {
            var menu = from m in db.Menu
                       orderby m.MenuID descending
                       select m;
            return menu.Take(top);
        }
    }
}
