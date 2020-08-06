using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Controllers
{
    public class TypeController : Controller
    {
        public ViewResult Type()
        {
            return View("~/Views/Dashboard/Type/Type.cshtml");
        }
    }
}
