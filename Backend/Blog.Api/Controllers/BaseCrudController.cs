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
        public async Task Get([FromRoute] string id, CancellationToken cancellationToken)
        {
        }

        [HttpGet]
        public async Task GetAll(CancellationToken cancellationToken)
        {
        }

        [HttpPost]
        public async Task Insert(
            [FromBody] TCommandModel model,
            CancellationToken cancellationToken
        )
        {
        }

        [HttpPut("{id}")]
        public async Task Update(
            [FromRoute] string id,
            [FromBody] TCommandModel model,
            CancellationToken cancellationToken
        )
        {
        }

        [HttpPut("{id}")]
        public async Task UpdatePartial(
            [FromRoute] string id,
            [FromBody] TCommandModel model,
            CancellationToken cancellationToken
        )
        {
        }

        [HttpDelete("{id}")]
        public async Task Delete(
            [FromRoute] string id,
            CancellationToken cancellationToken
        )
        {
        }
    }
}