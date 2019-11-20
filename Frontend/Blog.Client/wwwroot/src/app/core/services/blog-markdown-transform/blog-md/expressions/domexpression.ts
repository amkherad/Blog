import {IExpression} from "./iexpression";

export class DOMExpression implements IExpression {

  private tagName: string;

  public getTagName(): string {
    return this.tagName;
  }

}
