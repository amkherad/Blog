using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseCrudController<TQueryModel, TCommandModel, TKey, TEntity, TService> : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task Get(string id, CancellationToken cancellationToken)
        {
            
        }
        
        [HttpGet]
        public async Task GetAll(CancellationToken cancellationToken)
        {
            
        }
        
        [HttpPost]
        public async Task Insert(CancellationToken cancellationToken)
        {
            
        }
        
        [HttpPut("{id}")]
        public async Task Update(string id, CancellationToken cancellationToken)
        {
            
        }
        
        [HttpPut("{id}")]
        public async Task UpdatePartial(string id, CancellationToken cancellationToken)
        {
            
        }
        
        [HttpDelete("{id}")]
        public async Task Delete(string id, CancellationToken cancellationToken)
        {
            
        }
    }
}