using Blog.Data.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data.Repositories.Implementations
{
    public class Repository<TKey, TEntity> : IRepository<TKey, TEntity>
        where TEntity : class, IIdEntity<TKey>
    {
        public DbSet<TEntity> Set { get; }
        
        
        public Repository(DbSet<TEntity> set)
        {
            Set = set;
        }

    }
}