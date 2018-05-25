using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Models;

namespace UI.Models
{
    public class UserCenterViewModel
    {
        public IEnumerable<Users> Uses1 { get; set; }
        public Users Users { get; set; } //用来修改资料
    }
}