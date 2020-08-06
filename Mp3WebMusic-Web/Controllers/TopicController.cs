using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models;
using Mp3WebMusic_Web.Ultilities;
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
        public ViewResult TopicIsDElete()
        {

            return View("~/Views/Dashboard/Topic/TopicIsDelete.cshtml");
        }
        [Route("/Topic/GetsTopicIsNotDelete")]
        public JsonResult GetsTopicIsNotDelete() 
        { 
            var topics = new List<TopicResult>(); 
            topics = ApiHelper<List<TopicResult>>.HttpGetAsync($"{Helper.ApiUrl}/Api/Topic/GetsTopicIsNotDelete"); 
            var json = Json(new { topics });
            return json; 
        }
        [Route("/Topic/GetsTopicIsDelete")]
        public JsonResult GetsTopicIsDelete()
        {
            var topics = new List<TopicResult>();
            topics = ApiHelper<List<TopicResult>>.HttpGetAsync($"{Helper.ApiUrl}/Api/Topic/GetsTopicIsDelete");
            var json = Json(new { topics });
            return json;
        }
        [Route("/Topic/Add")]
        public JsonResult Add([FromBody] TopicResult model)
        {
            var result = new TopicResult();
            result = ApiHelper<TopicResult>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}/Api/Topic/Add",
                                                    model
                                                );
            return Json(new { result });
        }
    }
}
