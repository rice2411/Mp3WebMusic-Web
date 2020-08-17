using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Role;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Controllers
{
    public class RoleController: Controller
    {
        public ViewResult Role()
        {

            return View("~/Views/Dashboard/Role/Role.cshtml");
        }
        [Route("/Role/GetAll")]
        public JsonResult GetAll()
        {
            var roles = new List<Role>();
            roles = ApiHelper<List<Role>>.HttpGetAsync($"{Helper.ApiUrl}Api/Role/GetAll");
            var json = Json(new { roles });
            return json;
        }
        [Route("/Role/Add")]
        public JsonResult Add([FromBody] Role model)
        {
            if (ModelState.IsValid)
            {
                var result = new Role();
                result = ApiHelper<Role>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}Api/Role/Add",
                                                        model
                                                    );
                return Json(new { result });
            }
            return Json(new { });
        }
        [Route("/Role/Edit")]
        public JsonResult Edit([FromBody] Role model)
        {
            var result = new Role();
            result = ApiHelper<Role>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Role/Edit",
                                                    model
                                                );
            return Json(new { result });
        }
    }
}
