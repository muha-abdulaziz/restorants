import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const ACCEPTED_STATUSES = [
  'ACCEPTED',
  'PREPARED',
  'ON_DELIVERY',
  'REJECTED',
];

export function IsAcceptedOrderStatus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAcceptedOrderStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && ACCEPTED_STATUSES.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Status must be one of: ${ACCEPTED_STATUSES.join(', ')}`;
        },
      },
    });
  };
} 