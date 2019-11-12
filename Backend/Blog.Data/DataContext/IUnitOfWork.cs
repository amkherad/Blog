using System.Threading;
using System.Threading.Tasks;

namespace Blog.Data.DataContext
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}