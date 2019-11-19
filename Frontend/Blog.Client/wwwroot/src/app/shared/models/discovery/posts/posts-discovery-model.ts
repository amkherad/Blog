import {BlogPostDto} from "../../blog/blog-post-dto";
import {DiscoveryModel} from "shared/models/discovery/discovery-model";

export interface PostsDiscoveryModel extends DiscoveryModel {

  posts: Record<string, BlogPostDto>;

}
