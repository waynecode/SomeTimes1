using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Models;

namespace UI.Models
{
    public class HomeIndexViewModel
    {
        public IEnumerable<Food> Foodtop8 { get; set; }

        public IEnumerable<Menu> Menutop5 { get; set; }


        public IEnumerable<Special> Specialtop5 { get; set; }

    }
}