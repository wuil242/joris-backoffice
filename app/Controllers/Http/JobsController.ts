import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Job from 'App/Models/Job'

export default class JobsController {
  private LIMIT = 50
  private ORDER = 'name'
  
  public async index({params}:HttpContextContract) {
    const page = params.page || 1
    return await Job.query().orderBy(this.ORDER, 'asc').paginate(page, this.LIMIT)
  }

  
  public async store({request, response}:HttpContextContract) {
    const regexColor = /^#[0-9abcdefABCDEF]+$/
    const validation = schema.create({
      name: schema.string({ trim : true}),
      color: schema.string({}, [rules.regex(regexColor)]),
      bg_color: schema.string({}, [rules.regex(regexColor)]),
    })

    try {
      const payload = await request.validate({schema: validation})
      return await Job.create(payload)
    } catch (error) {
      return response.badRequest({
        type: 'error',
        message: error.message
      })
    }
  }

  
  public async destroy({params, response}:HttpContextContract) {
    try {
      const job = await Job.findOrFail(params.id)
      await job.delete()
      return job.id 
    } catch (error) {
      return response.badRequest({
        type: 'error',
        message: error.message
      })
    }
  }
}
