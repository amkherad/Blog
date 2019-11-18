import {RedTransportRestSchema} from "redtransport/dist/RedTransportRestSchema";
import {HttpRequestMethod} from "redtransport/dist/HttpRequestMethod";

export class ApiSchemaBase<TModel> implements RedTransportRestSchema<TModel> {
  method: HttpRequestMethod;
  uri: string;
  defaultQueries?: Record<string, any> | TModel;
  defaultValues?: Record<string, any> | TModel;
  transformer?: (response: Response) => (PromiseLike<TModel> | TModel);

  constructor(uri: string, applicationId?: string, uniqueIdentifier?: string, method?: HttpRequestMethod) {
    this.uri = uri;

    if (method) {
      this.method = method;
    } else {
      this.method = HttpRequestMethod.HttpGet
    }

    if (applicationId && uniqueIdentifier) {
      this.defaultQueries = {
        applicationId: applicationId,
        uniqueIdentifier: uniqueIdentifier
      };
    }
  }
}
