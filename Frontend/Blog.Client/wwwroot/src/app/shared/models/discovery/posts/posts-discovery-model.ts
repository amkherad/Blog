import {BlogPostDto} from "./blog-post-dto";
import {DiscoveryModel} from "shared/models/discovery/discovery-model";

export interface PostsDiscoveryModel extends DiscoveryModel {

  posts: BlogPostDto[];

}
