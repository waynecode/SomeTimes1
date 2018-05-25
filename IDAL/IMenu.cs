using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IMenu
    {
        IEnumerable<Menu> Menu();
        IQueryable<Menu> GetMenubyTop(int top);
    }
}
