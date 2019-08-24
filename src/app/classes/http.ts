abstract class CustomHttpResponseBase {
  constructor() {
  }

  response_status: {
    rc_id: number;
    rc_message: string;
  };
}

export class CustomHttpResponse<T> extends CustomHttpResponseBase {
  constructor() {
    super();
  }

  data: T | null;
}
