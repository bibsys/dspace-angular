
export class FNRSValidation {
  uuid: string;
  type: string;
  uniqueType: string;
  valid: boolean;
  relevant: boolean;
}

export class FNRSExplanation extends FNRSValidation {
  explanations: FNRSCategory[];
}

export class FNRSCategory {
  name: string;
  type: string;
  description: string;
  applicable: boolean;
  valid?: boolean;
  rules?: FNRSRule[];
}

export class FNRSRule {
  name: string;
  description: string;
  valid: boolean;
}