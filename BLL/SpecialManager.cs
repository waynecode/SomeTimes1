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
    public class SpecialManager
    {
        ISpecial ispecial = DataAccess.CreateSpecial();
        public IEnumerable<Special> Special5()
        {
            var special5 = ispecial.Special5();
            return special5;
        }

        public IQueryable<Special> GetSpecialbyTop(int top)
        {
            var special = ispecial.GetSpecialbyTop(top);
            return special;
        }
    }
}
