using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Controllers
{
    public class TopicController: Controller
    {
        public ViewResult Topic()
        {
            return View("~/Views/Dashboard/Topic/Topic.cshtml");
        } 
    }
}
