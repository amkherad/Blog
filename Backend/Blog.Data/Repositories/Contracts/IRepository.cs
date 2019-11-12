namespace Blog.Data.Repositories.Contracts
{
    public interface IRepository<TKey, TEntity>
        where TEntity : IIdEntity<TKey>
    {
        
    }
}