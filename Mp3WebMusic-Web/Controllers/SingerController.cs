using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Singer;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Mp3WebMusic_Web.Controllers
{
    public class SingerController: Controller
    {
        public ViewResult Singer()
        {

            return View("~/Views/Dashboard/Singer/Singer.cshtml");
        }
        public ViewResult SingerIsDelete()
        {

            return View("~/Views/Dashboard/Singer/SingerIsDelete.cshtml");
        }
        [Route("Singer/GetsTopicIsNotDelete")]
        public JsonResult GetsTopicIsNotDelete()
        {
            var singers = new List<GetSinger>();
            singers = ApiHelper<List<GetSinger>>.HttpGetAsync($"{Helper.ApiUrl}/Api/Singer/GetsSingerIsNotDelete");
            var json = Json(new { singers });
            return json;
        }
    //    [Route("/Topic/GetsTopicIsDelete")]
    //    public JsonResult GetsTopicIsDelete()
    //    {
    //        var topics = new List<GetTopic>();
    //        topics = ApiHelper<List<GetTopic>>.HttpGetAsync($"{Helper.ApiUrl}/Api/Topic/GetsTopicIsDelete");
    //        var json = Json(new { topics });
    //        return json;
    //    }
    //    [Route("/Topic/Add")]
    //    public JsonResult Add([FromBody] AddTopicRequest model)
    //    {
    //        var result = new SaveTopic();
    //        result = ApiHelper<SaveTopic>.HttpPostAsync(
    //                                                $"{Helper.ApiUrl}/Api/Topic/Add",
    //                                                model
    //                                            );
    //        return Json(new { result });
    //    }
    //    [Route("/Topic/Edit")]
    //    public JsonResult Edit([FromBody] EditTopicRequest model)
    //    {
    //        var result = new SaveTopic();
    //        result = ApiHelper<SaveTopic>.HttpPostAsync(
    //                                                $"{Helper.ApiUrl}/Api/Topic/Edit",
    //                                                model
    //                                            );
    //        return Json(new { result });
    //    }
    //    public JsonResult Get(int id)
    //    {
    //        var result = new GetTopic();
    //        result = ApiHelper<GetTopic>.HttpGetAsync(
    //                                                $"{Helper.ApiUrl}/Api/Topic/Get{id}"
    //                                            );
    //        return Json(new { result });
    //    }
    //    [Route("/Department/Delete/{id}")]
    //    public JsonResult Delete(int id)
    //    {
    //        var result = new SaveTopic();
    //        result = ApiHelper<SaveTopic>.HttpGetAsync(
    //                                                $"{Helper.ApiUrl}",
    //                                                "DELETE"
    //                                            );
    //        return Json(new { result });
    //    }
    }
}
