
export interface ContentTransformation {

  transform(response: Response): Promise<string>;

}
