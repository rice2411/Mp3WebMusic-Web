using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models.Topic
{
    public class EditTopicRequest
    {
        public int TopicID { get; set; }
        public string TopicName { get; set; }
    }
}
