namespace Blog.Data
{
    public interface IIdEntity<TKey>
    {
        TKey Id { get; set; }
    }
}