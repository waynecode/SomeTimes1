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
    public class MenuManager
    {
        IMenu imenu = DataAccess.CreateMenu();
        public IEnumerable<Menu> Menu()
        {
            var menu = imenu.Menu();
            return menu;      
        }
        public IQueryable<Menu> GetMenubyTop(int top)
        {
            var menu = imenu.GetMenubyTop(top);
            return menu;
        }
    }
}
