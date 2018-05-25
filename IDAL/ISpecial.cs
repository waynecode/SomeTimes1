using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface ISpecial
    {
        IEnumerable<Special> Special5();

        IQueryable<Special> GetSpecialbyTop(int top);
    }
}
