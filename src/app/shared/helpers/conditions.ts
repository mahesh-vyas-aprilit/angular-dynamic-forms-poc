enum stateLabel {
  isEquals = 'Is Equal To',
  isNotEquals = 'Is Not Equal To',
  containes = 'Contains',
  notContaines = 'Does not Contain',
  startsWith = 'Starts With',
  notStartsWith = 'Does not Start With',
  endsWith = 'Ends With',
  notEndsWith = 'Does not End With',
  isEmpty = 'Is Empty',
  isFilled = 'Is Filled',
  before = 'Before',
  after = 'After',
  isEqualsToDate = 'Is Equal to Date',
  notEqualsToDate = 'Not Equal to Date',
  isEqualsToDay = 'Is Equal to Day',
  notEqualsToDay = 'Not Equal to Day',
  lessThan = 'Less Than',
  greaterThan = 'Greater Than',
  show = 'Show',
  hide = 'Hide',
}

export const numberConditions = [
  {
    label: stateLabel.isEquals,
    value: 'isEquals',
  },
  {
    label: stateLabel.isNotEquals,
    value: 'isNotEquals',
  },
  {
    label: stateLabel.isEmpty,
    value: 'isEmpty',
  },
  {
    label: stateLabel.isFilled,
    value: 'isFilled',
  },
  {
    label: stateLabel.lessThan,
    value: 'lessThan',
  },
  {
    label: stateLabel.greaterThan,
    value: 'greaterThan',
  },
];

export const stringConditions = [
  {
    label: stateLabel.isEquals,
    value: 'isEquals',
  },
  {
    label: stateLabel.isNotEquals,
    value: 'isNotEquals',
  },
  {
    label: stateLabel.containes,
    value: 'containes',
  },
  {
    label: stateLabel.notContaines,
    value: 'notContaines',
  },
  {
    label: stateLabel.startsWith,
    value: 'startsWith',
  },
  {
    label: stateLabel.notStartsWith,
    value: 'notStartsWith',
  },
  {
    label: stateLabel.endsWith,
    value: 'endsWith',
  },
  {
    label: stateLabel.notEndsWith,
    value: 'notEndsWith',
  },
  {
    label: stateLabel.isEmpty,
    value: 'isEmpty',
  },
  {
    label: stateLabel.isFilled,
    value: 'isFilled',
  },
];

export const dateConditions = [
  {
    label: stateLabel.isEmpty,
    value: 'isEmpty',
  },
  {
    label: stateLabel.isFilled,
    value: 'isFilled',
  },
  {
    label: stateLabel.before,
    value: 'before',
  },
  {
    label: stateLabel.after,
    value: 'after',
  },
  {
    label: stateLabel.isEqualsToDate,
    value: 'isEqualsToDate',
  },
  {
    label: stateLabel.notEqualsToDate,
    value: 'notEqualsToDate',
  },
  {
    label: stateLabel.isEqualsToDay,
    value: 'isEqualsToDay',
  },
  {
    label: stateLabel.notEqualsToDay,
    value: 'notEqualsToDay',
  },
];

export const commonConditions = [
  {
    label: stateLabel.isEquals,
    value: 'isEquals',
  },
  {
    label: stateLabel.isNotEquals,
    value: 'isNotEquals',
  },
  {
    label: stateLabel.isEmpty,
    value: 'isEmpty',
  },
  {
    label: stateLabel.isFilled,
    value: 'isFilled',
  },
];

export const doConditions = [
  {
    label: stateLabel.show,
    value: 'show',
  },
  {
    label: stateLabel.hide,
    value: 'hide',
  },
];

export const targetValues = [
  {
    label: 'Value',
    value: 'value',
  },
  {
    label: 'Another Field',
    value: 'anotherField',
  },
];

export function applyNumberConditions(
  condition: string,
  val1: number,
  val2?: number
) {
  switch (condition) {
    case 'isEquals':
      return val1 === val2;
    case 'isNotEquals':
      return val1 !== val2;
    case 'isEmpty':
      return val1 === 0;
    case 'isFilled':
      return val1 !== 0;
    case 'lessThan':
      return val1 < val2!;
    case 'greaterThan':
      return val1 > val2!;
    default:
      return false;
  }
}

export function applyStringConditions(
  condition: string,
  val1: string,
  val2?: string
) {
  switch (condition) {
    case 'isEquals':
      return val1 === val2;
    case 'isNotEquals':
      return val1 !== val2;
    case 'containes':
      return val1.includes(val2!);
    case 'notContaines':
      return !val1.includes(val2!);
    case 'startsWith':
      return val1.startsWith(val2!);
    case 'notStartsWith':
      return !val1.startsWith(val2!);
    case 'endsWith':
      return val1.endsWith(val2!);
    case 'notEndsWith':
      return !val1.endsWith(val2!);
    case 'isEmpty':
      return val1 === '';
    case 'isFilled':
      return val1 !== '';
    default:
      return false;
  }
}

export function applyDateConditions(
  condition: string,
  val1: Date,
  val2?: Date
) {
  switch (condition) {
    case 'isEmpty':
      return val1.getTime() === 0;
    case 'isFilled':
      return val1.getTime() !== 0;
    case 'before':
      return val1.getTime() < val2!.getTime();
    case 'after':
      return val1.getTime() > val2!.getTime();
    case 'isEqualsToDate':
      return val1.getTime() === val2!.getTime();
    case 'notEqualsToDate':
      return val1.getTime() !== val2!.getTime();
    case 'isEqualsToDay':
      return val1.getDate() === val2!.getDate();
    case 'notEqualsToDay':
      return val1.getDate() !== val2!.getDate();
    default:
      return false;
  }
}

export function applyCommonConditions(
  condition: string,
  val1: any,
  val2?: any
) {
  switch (condition) {
    case 'isEquals':
      return val1 === val2;
    case 'isNotEquals':
      return val1 !== val2;
    case 'isEmpty':
      return val1 === '';
    case 'isFilled':
      return val1 !== '';
    default:
      return false;
  }
}
