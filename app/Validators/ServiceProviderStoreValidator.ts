import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


const nameRegex = /^[a-zA-Z\-]+$/
const numberPhoneRegex = /^[0-9]+$/

export default class ServiceProviderStoreValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
		//information personnel du perstataire
		lastname: schema.string({ trim: true}, [rules.regex(nameRegex)]),
		firstname: schema.string({trim: true}, [rules.regex(nameRegex)]),
		birthday: schema.date({format: 'mm/dd/yyyy'}),
		email: schema.string.optional({trim: true}, [rules.email()]),
		tel: schema.string({trim: true}, [rules.regex(numberPhoneRegex)]),
		tel2: schema.string({trim: true}, [rules.regex(numberPhoneRegex)]),
		photo: schema.string.optional(),
		introduce: schema.string.optional({ trim: true}),
		sexe: schema.enum(['m', 'f']),
		accroch_sentence: schema.string({ trim: true})
	})

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {}
}
