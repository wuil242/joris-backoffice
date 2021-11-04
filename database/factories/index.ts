import Factory from '@ioc:Adonis/Lucid/Factory'
import ClientDevi from 'App/Models/ClientDevi'
import ServiceProvider from 'App/Models/ServiceProvider'

export const DevisFactory = Factory.define(ClientDevi, async ({faker}) => {
  const sp = await ServiceProvider.first()
  
  return {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    message: faker.lorem.paragraph(1),
    tel: faker.phone.phoneNumber('06#######'),
    serviceProviderId: sp?.id
  }
}).build()
