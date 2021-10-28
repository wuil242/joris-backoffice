import Factory from '@ioc:Adonis/Lucid/Factory'
import Devi from 'App/Models/ClientDevi'
import ServiceProvider from 'App/Models/ServiceProvider'

export const DevisFactory = Factory.define(Devi, async ({faker}) => {
  const sp = await ServiceProvider.first()
  
  return {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    description: faker.lorem.paragraph(2),
    tel: faker.phone.phoneNumber('06#######'),
    serviceProviderId: sp?.id
  }
}).build()
