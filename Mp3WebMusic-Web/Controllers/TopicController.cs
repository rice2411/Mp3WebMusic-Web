using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models;
using Mp3WebMusic_Web.Ultilities;
using System.Collections.Generic;

namespace Mp3WebMusic_Web.Controllers
{
    public class TopicController: Controller
    {
        public ViewResult Detail(int id)
        {
            var topic = new Topic()
            {
                TopicID = id
            };
            return View("~/Views/Home/TopicDetail.cshtml",topic);
        }
        public ViewResult Search()
        {

            return View("~/Views/Home/TopicList.cshtml");
        }
        public ViewResult Topic()
        {
           
            return View("~/Views/Dashboard/Topic/Topic.cshtml");
        }
        public ViewResult TopicIsDelete()
        {

            return View("~/Views/Dashboard/Topic/TopicIsDelete.cshtml");
        }
        [Route("/Topic/GetsTopicIsNotDelete")]
        public JsonResult GetsTopicIsNotDelete() 
        { 
            var topics = new List<Topic>(); 
            topics = ApiHelper<List<Topic>>.HttpGetAsync($"{Helper.ApiUrl}Api/Topic/GetsTopicIsNotDelete"); 
            var json = Json(new { topics });
            return json; 
        }
        [Route("/Topic/GetsTopicIsDelete")]
        public JsonResult GetsTopicIsDelete()
        {
            var topics = new List<Topic>();
            topics = ApiHelper<List<Topic>>.HttpGetAsync($"{Helper.ApiUrl}Api/Topic/GetsTopicIsDelete");
            var json = Json(new { topics });
            return json;
        }
        [Route("/Topic/GetsTopicTop4")]
        public JsonResult GetsTopicTop4()
        {
            var topics = new List<Topic>();
            topics = ApiHelper<List<Topic>>.HttpGetAsync($"{Helper.ApiUrl}Api/Topic/GetsTopicTop4");
            var json = Json(new { topics });
            return json;
        }
        [Route("/Topic/Add")]
        public JsonResult Add([FromBody] Topic model)
        {
           if(ModelState.IsValid)
            {
                var result = new Topic();
                result = ApiHelper<Topic>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}Api/Topic/Add",
                                                        model
                                                    );
                return Json(new { result });
            }
            return Json(new {  });
        }
        [Route("/Topic/Edit")]
        public JsonResult Edit([FromBody] Topic model)
        {
            var result = new Topic();
            result = ApiHelper<Topic>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Topic/Edit",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Topic/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Topic();
            result = ApiHelper<Topic>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Topic/Get/{id}"
                                                );
            return Json(new {result});
        }
        [Route("/Topic/Delete/{id}")]
        public JsonResult Delete(int id)
        {
            var result = new Topic();
            result = ApiHelper<Topic>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Topic/Delete/{id}",
                                                    "post"
                                                );
            return Json(new { result });
        }
        [Route("/Topic/Restore/{id}")]
        public JsonResult Restore(int id)
        {
            var result = new Topic();
            result = ApiHelper<Topic>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Topic/Restore/{id}",
                                                    "post"
                                                );
            return Json(new { result });
        }

    }
}
