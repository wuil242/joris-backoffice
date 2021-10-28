import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DevisFactory } from 'Database/factories'

export default class DeviSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await DevisFactory.createMany(10)
  }
}
