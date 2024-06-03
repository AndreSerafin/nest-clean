import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        const { name, ...errorsWithoutName } = fromZodError(error) // eslint-disable-line @typescript-eslint/no-unused-vars
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: errorsWithoutName,
        })
      }
      throw new BadRequestException('Validation failed')
    }
  }
}
