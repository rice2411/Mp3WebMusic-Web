using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Controllers
{
    public class AuthorController : Controller
    {
        public ViewResult Author()
        {
            return View("~/Views/Dashboard/Author/Author.cshtml");
        }        
    }
}
