export interface FormField {
  data: FormFieldJSON[];
}

export interface FormFieldJSON {
  id: string;
  name: string;
  label: string;
  value: string;
  type: string;
  isHidden: boolean;
  validators: ValidatorJSON;
  options: OptionJSON[];
  conditions: ConditionJSON[];
}

export interface ConditionJSON {
  id: string;
  if: string;
  state: string;
  target: string;
  targetValue: string | null;
  targetField: string | null;
  do: string;
  field: string;
}

interface ValidatorJSON {
  required?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
}

export interface OptionJSON {
  label: string;
  value: string;
}
