using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AureliaDotnetTemplate.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public DateTime NeedDate { get; set; }
        public string JobType { get; set; }
        public string Description { get; set; }
    }
}
