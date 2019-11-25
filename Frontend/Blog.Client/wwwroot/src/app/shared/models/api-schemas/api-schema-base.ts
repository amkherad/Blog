import {RedTransportRestSchema} from "redtransport/dist/RedTransportRestSchema";
import {HttpRequestMethod} from "redtransport/dist/HttpRequestMethod";

export class ApiSchemaBase<TInputModel, TOutputModel> implements RedTransportRestSchema<TInputModel, TOutputModel> {
  method: HttpRequestMethod;
  uri: string;
  defaultQueries?: Record<string, any> | TInputModel;
  defaultValues?: Record<string, any> | TInputModel;
  transformer?: (response: Response) => (PromiseLike<TOutputModel> | TOutputModel);

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
