import { BlogMarkdownPipe } from './blog-markdown.pipe';

describe('BlogMarkdownPipe', () => {
  it('create an instance', () => {
    const pipe = new BlogMarkdownPipe();
    expect(pipe).toBeTruthy();
  });
});
